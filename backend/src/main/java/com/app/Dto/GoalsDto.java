package com.app.Dto;

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
public class GoalsDto extends BaseDto {
    private UserDto user;
    @NotNull
    private String goalName;
    @NotNull
    @Positive
    private double targetAmount;
    private double currentAmount;
    private double remainingAmount;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime targetDate;
}
