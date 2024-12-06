package com.app.Dto;

import com.app.enums.TransactionType;
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
    private TransactionType transactionType;
    private double amount;
    private LocalDateTime transactionDate;
    private String reference;
    private double newBalance;
    private UserDto user;

}
