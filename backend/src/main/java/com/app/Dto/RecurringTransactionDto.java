package com.app.Dto;

import com.app.enums.Frequency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecurringTransactionDto extends BaseDto {
    private UserDto user;
    private AccountDto account;
    private CategoryDto category;
    private String name;
    private double amount;
    private Frequency frequency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
