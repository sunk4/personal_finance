package com.app.Dto;

import com.app.enums.Frequency;
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
public class RecurringTransactionDto extends BaseDto {
    private UserDto user;
    private AccountDto account;
    @NotNull
    private String name;
    @Positive
    private double amount;
    @NotNull
    private Frequency frequency;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;
}
