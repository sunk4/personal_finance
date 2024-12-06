package com.app.service;

import com.app.Dto.RecurringTransactionDto;

import java.util.List;
import java.util.UUID;

public interface RecurringTransactionService {

    void createRecurringTransaction (RecurringTransactionDto recurringTransactionDto, UUID userId);

    List<RecurringTransactionDto> getRecurringTransactions (
            UUID userId,
            String name
    );

    void deleteRecurringTransaction (UUID recurringTransactionId);

    void updateRecurringTransaction (UUID recurringTransactionId, RecurringTransactionDto recurringTransactionDto);

    double getRecurringTransactionsSum (UUID userId);

    RecurringTransactionDto getRecurringTransaction (UUID recurringTransactionId);
}
