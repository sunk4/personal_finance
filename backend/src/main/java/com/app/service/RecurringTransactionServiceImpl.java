package com.app.service;

import com.app.Dto.RecurringTransactionDto;
import com.app.entity.Account;
import com.app.entity.Category;
import com.app.entity.RecurringTransaction;
import com.app.entity.User;
import com.app.mapper.AccountMapper;
import com.app.mapper.CategoryMapper;
import com.app.mapper.RecurringTransactionsMapper;
import com.app.mapper.UserMapper;
import com.app.repository.AccountRepository;
import com.app.repository.CategoryRepository;
import com.app.repository.RecurringTransactionRepository;
import com.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecurringTransactionServiceImpl implements RecurringTransactionService {
    private final UserRepository userRepository;
    private final RecurringTransactionRepository recurringTransactionRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final AccountMapper accountMapper;
    private final UserMapper userMapper;
    private final RecurringTransactionsMapper recurringTransactionMapper;
    private final CategoryMapper categoryMapper;

    @Override
    public void createRecurringTransaction (RecurringTransactionDto recurringTransactionDto, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Account account =
                accountRepository.findById(recurringTransactionDto.getAccount().getId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Account not found"));

        Category category = categoryRepository.findById(recurringTransactionDto.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        recurringTransactionDto.setUser(userMapper.toDto(user));
        recurringTransactionDto.setAccount(accountMapper.toDto(account));
        recurringTransactionDto.setCategory(categoryMapper.toDto(category));

        RecurringTransaction recurringTransaction = recurringTransactionMapper.toEntity(recurringTransactionDto);

        recurringTransactionRepository.save(recurringTransaction);
    }

    @Override
    public List<RecurringTransactionDto> getRecurringTransactions (UUID userId, String name) {
        List<RecurringTransaction> recurringTransactions;
        if (name != null && !name.isEmpty()) {
            recurringTransactions =
                    recurringTransactionRepository.findByUserIdAndNameContainingIgnoreCase(userId, name);
        } else {
            recurringTransactions =
                    recurringTransactionRepository.findByUserId(userId);
        }

        return recurringTransactions.stream()
                .map(recurringTransactionMapper::toDto)
                .toList();
    }

    @Override
    public void deleteRecurringTransaction (UUID recurringTransactionId) {
        recurringTransactionRepository.findById(recurringTransactionId)
                .orElseThrow(() -> new EntityNotFoundException("Recurring transaction not found"));
        recurringTransactionRepository.deleteById(recurringTransactionId);
    }

    @Override
    public void updateRecurringTransaction (UUID recurringTransactionId, RecurringTransactionDto recurringTransactionDto) {
        RecurringTransaction recurringTransaction = recurringTransactionRepository.findById(recurringTransactionId)
                .orElseThrow(() -> new EntityNotFoundException("Recurring transaction not found"));

        User user = userRepository.findById(recurringTransaction.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Account account = accountRepository.findById(recurringTransaction.getAccount().getId())
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        Category category = categoryRepository.findById(recurringTransaction.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (recurringTransactionDto.getUser() != null) {
            user = userRepository.findById(recurringTransactionDto.getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
        }

        if (recurringTransactionDto.getAccount() != null) {
            account = accountRepository.findById(recurringTransactionDto.getAccount().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Account not found"));
        }

        if (recurringTransactionDto.getCategory() != null) {
            category = categoryRepository.findById(recurringTransactionDto.getCategory().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        }

        recurringTransaction.setUser(user);
        recurringTransaction.setAccount(account);
        recurringTransaction.setCategory(category);

        if (recurringTransactionDto.getName() != null) {
            recurringTransaction.setName(recurringTransactionDto.getName());
        }

        if (recurringTransactionDto.getAmount() != 0) {
            recurringTransaction.setAmount(recurringTransactionDto.getAmount());
        }

        if (recurringTransactionDto.getFrequency() != null) {
            recurringTransaction.setFrequency(recurringTransactionDto.getFrequency());
        }

        if (recurringTransactionDto.getStartDate() != null) {
            recurringTransaction.setStartDate(recurringTransactionDto.getStartDate());
        }

        if (recurringTransactionDto.getEndDate() != null) {
            recurringTransaction.setEndDate(recurringTransactionDto.getEndDate());
        }

        recurringTransactionRepository.save(recurringTransaction);
    }

    @Override
    public double getRecurringTransactionsSum (UUID userId) {
        List<RecurringTransaction> recurringTransactions =
                recurringTransactionRepository.findByUserId(userId);

        return recurringTransactions.stream().mapToDouble(RecurringTransaction::getAmount).sum();

    }

    @Override
    public RecurringTransactionDto getRecurringTransaction (UUID recurringTransactionId) {
        RecurringTransaction recurringTransaction = recurringTransactionRepository.findById(recurringTransactionId)
                .orElseThrow(() -> new EntityNotFoundException("Recurring transaction not found"));

        return recurringTransactionMapper.toDto(recurringTransaction);
    }
}
