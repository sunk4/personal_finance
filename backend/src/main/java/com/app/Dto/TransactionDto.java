package com.app.Dto;

import com.app.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto extends BaseDto {
    private AccountDto account;
    @NotNull
    private TransactionType transactionType;
    @Positive
    private double amount;
    @NotNull
    private LocalDateTime transactionDate;
    @NotNull
    private String reference;
    private double newBalance;
    private UserDto user;

}
