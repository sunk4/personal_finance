package com.app.entity;

import com.app.enums.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Transaction extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private double amount;
    private LocalDateTime transactionDate;
    private String reference;
    private double newBalance;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
