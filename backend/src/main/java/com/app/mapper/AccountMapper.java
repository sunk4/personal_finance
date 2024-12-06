package com.app.mapper;

import com.app.Dto.AccountDto;
import com.app.entity.Account;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper extends EntityMapperImpl<AccountDto, Account> {
    public AccountMapper () {
        setDtoClass(AccountDto.class);
        setEntityClass(Account.class);
    }

}
