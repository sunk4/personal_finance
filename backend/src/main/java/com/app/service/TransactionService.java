package com.app.service;

import com.app.Dto.TransactionDto;
import com.app.common.PageResponse;
import com.app.enums.TransactionType;

import java.util.UUID;

public interface TransactionService {
    void createTransaction (TransactionDto transactionDto, UUID userId);

    PageResponse<TransactionDto> getTransactions (
            int page, int size,
            TransactionType transactionType,
            String sort,
            UUID accountId,
            UUID userId
    );

    byte[] exportTransactionsToPdf (UUID accountId);

    void cronJobAddRecurringTransactionToTransaction ();
}
