package com.app.Dto;

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
    private String goalName;
    private double targetAmount;
    private double currentAmount;
    private double remainingAmount;
    private LocalDateTime startDate;
    private LocalDateTime targetDate;
}
