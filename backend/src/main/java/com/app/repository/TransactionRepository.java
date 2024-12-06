package com.app.repository;

import com.app.entity.Transaction;
import com.app.enums.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    Page<Transaction> findByUserId (UUID userId, Pageable pageable);

    Page<Transaction> findByUserIdAndTransactionType (UUID userId, TransactionType transactionType, Pageable pageable);

    Page<Transaction> findByUserIdAndAccountId (UUID userId, UUID accountId, Pageable pageable);

    Page<Transaction> findByUserIdAndAccountIdAndTransactionType (UUID userId, UUID accountId, TransactionType transactionType, Pageable pageable);

    void deleteByAccountId (UUID accountId);

    List<Transaction> findByUserId (UUID userId);
}
