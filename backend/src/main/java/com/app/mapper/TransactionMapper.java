package com.app.mapper;

import com.app.Dto.TransactionDto;
import com.app.entity.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper extends EntityMapperImpl<TransactionDto, Transaction> {
    public TransactionMapper() {
        setDtoClass(TransactionDto.class);
        setEntityClass(Transaction.class);
    }
}
