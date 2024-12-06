package com.app.entity;

import com.app.enums.Frequency;
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
public class RecurringTransaction extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    private String name;
    private double amount;
    @Enumerated(EnumType.STRING)
    private Frequency frequency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime lastProcessedDate;
}
