package com.app.service;

import com.app.Dto.AccountDto;

import java.util.List;
import java.util.UUID;

public interface AccountService {

    void createAccount (AccountDto accountDto, UUID userId);

    List<AccountDto> getAccounts (UUID userId);

    AccountDto getAccount (UUID accountId);

    void updateAccount (UUID accountId, AccountDto accountDto);

    void deleteAccount (UUID accountId);
}
