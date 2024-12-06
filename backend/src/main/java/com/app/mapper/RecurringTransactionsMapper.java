package com.app.mapper;

import com.app.Dto.RecurringTransactionDto;
import com.app.entity.RecurringTransaction;
import org.springframework.stereotype.Component;

@Component
public class RecurringTransactionsMapper extends EntityMapperImpl<RecurringTransactionDto, RecurringTransaction> {
    public RecurringTransactionsMapper () {
        setDtoClass(RecurringTransactionDto.class);
        setEntityClass(RecurringTransaction.class);
    }
}
