package com.app.repository;

import com.app.entity.RecurringTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, UUID> {
    List<RecurringTransaction> findByUserId (UUID userId);

    List<RecurringTransaction> findByUserIdAndNameContainingIgnoreCase (UUID userId, String name);
}
