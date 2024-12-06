package com.app.service;

import com.app.Dto.AccountDto;
import com.app.Dto.UserDto;
import com.app.entity.Account;
import com.app.entity.User;
import com.app.mapper.AccountMapper;
import com.app.mapper.UserMapper;
import com.app.repository.AccountRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountMapper accountMapper;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TransactionRepository transactionRepository;

    @Override
    public UUID createAccount (AccountDto accountDto, UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserDto userDto = userMapper.toDto(user.get());
            accountDto.setUser(userDto);
            Account savedAccount =
                    accountRepository.save(accountMapper.toEntity(accountDto));
            return savedAccount.getId();
        } else {
            throw new RuntimeException("User not found");
        }

    }

    @Override
    public List<AccountDto> getAccounts (UUID userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        return accounts.stream().map(accountMapper::toDto).collect(Collectors.toList());

    }

    @Override
    public AccountDto getAccount (UUID accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        return account.map(accountMapper::toDto).orElse(null);
    }

    @Override
    public void updateAccount (UUID accountId, AccountDto accountDto) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        User user = userRepository.findById(account.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Account accountEntity = accountMapper.toEntity(accountDto);
        accountEntity.setId(accountId);
        accountEntity.setUser(user);

        accountRepository.save(accountEntity);
    }

    @Override
    public void deleteAccount (UUID accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));
        accountRepository.delete(account);
        transactionRepository.deleteByAccountId(accountId);

    }
}
