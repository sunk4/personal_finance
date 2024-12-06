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
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {

    private static UUID userId;
    private static User user;
    private static UserDto userDto;
    private static AccountDto accountDto;
    private static Account account;
    private static UUID accountId;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;
    @Mock
    private AccountMapper accountMapper;
    @Mock
    private TransactionRepository transactionRepository;
    @InjectMocks
    private AccountServiceImpl accountService;

    @BeforeAll
    static void setUp () {
        userId = UUID.randomUUID();
        accountId = UUID.randomUUID();
        user = new User();
        userDto = new UserDto();
        accountDto = new AccountDto();
        account = new Account();
    }

    @Test
    void createAccount () {

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(accountMapper.toEntity(accountDto)).thenReturn(account);

        accountService.createAccount(accountDto, userId);

        assertAll(
                () -> verify(userRepository).findById(userId),
                () -> verify(userMapper).toDto(user),
                () -> verify(accountMapper).toEntity(accountDto),
                () -> verify(accountRepository).save(account)
        );

    }

    @Test
    void getAccounts () {
        List<Account> accounts = List.of(account);

        when(accountRepository.findByUserId(userId)).thenReturn(accounts);
        when(accountMapper.toDto(account)).thenReturn(accountDto);

        List<AccountDto> result = accountService.getAccounts(userId);

        verify(accountRepository).findByUserId(userId);
        verify(accountMapper).toDto(account);

        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isInstanceOf(AccountDto.class);

    }

    @Test
    void updateAccount () {
        account.setUser(user);
        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(accountMapper.toEntity(accountDto)).thenReturn(account);

        accountService.updateAccount(accountId, accountDto);

        verify(accountRepository).findById(accountId);
        verify(userRepository).findById(user.getId());
        verify(accountMapper).toEntity(accountDto);
        verify(accountRepository).save(account);

    }

    @Test
    void deleteAccount () {
        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));

        accountService.deleteAccount(accountId);

        verify(accountRepository).findById(accountId);
        verify(accountRepository).delete(account);
        verify(transactionRepository).deleteByAccountId(accountId);

    }
}