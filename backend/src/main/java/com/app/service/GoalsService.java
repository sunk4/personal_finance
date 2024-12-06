package com.app.service;

import com.app.Dto.GoalsDto;

import java.util.List;
import java.util.UUID;

public interface GoalsService {

    void createGoal (GoalsDto goalsDto, UUID userId);

    List<GoalsDto> getGoals (UUID userId);

    void deleteGoal (UUID goalId);

    void updateGoal (UUID goalId, GoalsDto goalsDto);

    void addAmount (UUID goalId, double currentAmount);

    GoalsDto getGoal (UUID goalId);
}
