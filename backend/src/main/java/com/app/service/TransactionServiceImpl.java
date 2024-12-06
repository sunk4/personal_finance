package com.app.service;

import com.app.Dto.TransactionDto;
import com.app.common.PageResponse;
import com.app.entity.Account;
import com.app.entity.RecurringTransaction;
import com.app.entity.Transaction;
import com.app.entity.User;
import com.app.enums.TransactionType;
import com.app.mapper.TransactionMapper;
import com.app.mapper.UserMapper;
import com.app.repository.AccountRepository;
import com.app.repository.RecurringTransactionRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    private final RecurringTransactionRepository recurringTransactionRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public void createTransaction (TransactionDto transactionDto, UUID userId) {
        User user =
                userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        UUID accountId = transactionDto.getAccount().getId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));
        double newBalance;
        switch (transactionDto.getTransactionType()) {
            case DEPOSIT:
                newBalance = account.getBalance() + transactionDto.getAmount();
                account.setBalance(newBalance);
                break;
            case WITHDRAWAL, TRANSFER, PAYMENT:
                newBalance = account.getBalance() - transactionDto.getAmount();
                account.setBalance(newBalance);
                break;
            default:
                throw new IllegalArgumentException("Invalid transaction type");
        }

        accountRepository.save(account);
        transactionDto.setNewBalance(newBalance);
        transactionDto.setUser(userMapper.toDto(user));

        transactionRepository.save(transactionMapper.toEntity(transactionDto));

    }

    @Override
    public PageResponse<TransactionDto> getTransactions (
            int page, int size,
            TransactionType transactionType,
            String sort,
            UUID accountId,
            UUID userId
    ) {

        Sort sorting = switch (sort.toLowerCase()) {
            case "a-z" -> Sort.by("reference").ascending();
            case "z-a" -> Sort.by("reference").descending();
            case "oldest" -> Sort.by("transactionDate").ascending();
            case "highest" -> Sort.by("amount").descending();
            case "lowest" -> Sort.by("amount").ascending();
            default -> Sort.by("transactionDate").descending();
        };

        PageRequest pageRequest = PageRequest.of(page, size, sorting);

        Page<Transaction> transactions;

        if (accountId != null) {
            if (transactionType == null) {
                transactions = transactionRepository.findByUserIdAndAccountId(userId, accountId, pageRequest);
            } else {
                transactions = transactionRepository.findByUserIdAndAccountIdAndTransactionType(userId, accountId, transactionType, pageRequest);
            }
        } else {
            if (transactionType == null) {
                transactions = transactionRepository.findByUserId(userId, pageRequest);
            } else {
                transactions = transactionRepository.findByUserIdAndTransactionType(userId, transactionType, pageRequest);
            }
        }

        List<TransactionDto> transactionDtos = transactions.stream()
                .map(transactionMapper::toDto).toList();
        return new PageResponse<>(
                transactionDtos,
                transactions.getNumber(),
                transactions.getSize(),
                transactions.getTotalElements(),
                transactions.getTotalPages()
        );
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    public void cronJobAddRecurringTransactionToTransaction () {
        List<RecurringTransaction> recurringTransactions =
                recurringTransactionRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        for (RecurringTransaction recurringTransaction : recurringTransactions) {
            if (checkFrequency(recurringTransaction)) {
                Transaction transaction = Transaction.builder()
                        .account(recurringTransaction.getAccount())
                        .transactionType(TransactionType.RECURRING)
                        .amount(recurringTransaction.getAmount())
                        .transactionDate(now)
                        .reference(recurringTransaction.getName())
                        .newBalance(recurringTransaction.getAccount().getBalance())
                        .build();
                transactionRepository.save(transaction);
                recurringTransaction.setLastProcessedDate(now);
                recurringTransactionRepository.save(recurringTransaction);
            }

        }
    }

    @Override
    public byte[] exportTransactionsToExcel (UUID userId) {
        List<Transaction> transactions =
                transactionRepository.findByUserId(userId);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Transactions");

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Id");
            headerRow.createCell(1).setCellValue("Account");
            headerRow.createCell(2).setCellValue("Reference");
            headerRow.createCell(3).setCellValue("Transaction type");
            headerRow.createCell(4).setCellValue("Transaction date");
            headerRow.createCell(5).setCellValue("Amount");
            headerRow.createCell(6).setCellValue("Balance");

            int rowNum = 1;
            for (Transaction transaction : transactions) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(transaction.getId().toString());
                row.createCell(1).setCellValue(transaction.getAccount().getName());
                row.createCell(2).setCellValue(transaction.getReference());
                row.createCell(3).setCellValue(transaction.getTransactionType().name());
                row.createCell(4).setCellValue(transaction.getTransactionDate().toString());
                row.createCell(5).setCellValue(transaction.getAmount());
                row.createCell(6).setCellValue(transaction.getNewBalance());
            }

            try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
                workbook.write(out);
                return out.toByteArray();
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to export transactions to Excel", e);
        }
    }

    public boolean checkFrequency (RecurringTransaction recurringTransaction) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime lastProcessedDate = recurringTransaction.getLastProcessedDate();
        if (lastProcessedDate == null) {
            lastProcessedDate = recurringTransaction.getStartDate();
        }
        return switch (recurringTransaction.getFrequency()) {
            case DAILY -> now.isAfter(lastProcessedDate.plusDays(1));
            case WEEKLY -> now.isAfter(lastProcessedDate.plusWeeks(1));
            case BIWEEKLY -> now.isAfter(lastProcessedDate.plusWeeks(2));
            case MONTHLY -> now.isAfter(lastProcessedDate.plusMonths(1));
            case BIMONTHLY -> now.isAfter(lastProcessedDate.plusMonths(2));
            case QUARTERLY -> now.isAfter(lastProcessedDate.plusMonths(3));
            case SEMIANNUALLY -> now.isAfter(lastProcessedDate.plusMonths(6));
            case ANNUALLY -> now.isAfter(lastProcessedDate.plusYears(1));
        };

    }
}
