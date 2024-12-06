package com.app.service;

import com.app.Dto.GoalsDto;
import com.app.entity.Goals;
import com.app.entity.User;
import com.app.mapper.GoalsMapper;
import com.app.mapper.UserMapper;
import com.app.repository.GoalsRepository;
import com.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoalsServiceImpl implements GoalsService {
    private final UserRepository userRepository;
    private final GoalsRepository goalsRepository;
    private final UserMapper userMapper;
    private final GoalsMapper goalsMapper;

    @Override
    public void createGoal (GoalsDto goalsDto, UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            goalsDto.setUser(userMapper.toDto(user.get()));
            goalsDto.setCurrentAmount(0);
            goalsRepository.save(goalsMapper.toEntity(goalsDto));
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

    @Override
    public List<GoalsDto> getGoals (UUID userId) {
        List<Goals> goals =
                goalsRepository.findByUserId(userId);
        goals.sort(Comparator.comparing(Goals::getCreatedAt));
        return goals.stream().map(goal -> {
            GoalsDto goalsDto = goalsMapper.toDto(goal);
            double remainingAmount = goal.getTargetAmount() - goal.getCurrentAmount();
            goalsDto.setRemainingAmount(remainingAmount);
            return goalsDto;
        }).toList();
    }

    @Override
    public void deleteGoal (UUID goalId) {
        goalsRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        goalsRepository.deleteById(goalId);
    }

    @Override
    public void updateGoal (UUID goalId, GoalsDto goalsDto) {
        Goals goal = goalsRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        User user = userRepository.findById(goal.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Goals goals = goalsMapper.toEntity(goalsDto);

        if (goalsDto.getCurrentAmount() != 0) {
            goals.setCurrentAmount(goalsDto.getCurrentAmount());
        } else {
            goals.setCurrentAmount(goal.getCurrentAmount());
        }

        if (goalsDto.getGoalName() != null && !goalsDto.getGoalName().isEmpty()) {
            goals.setGoalName(goalsDto.getGoalName());
        } else {
            goals.setGoalName(goal.getGoalName());
        }

        if (goalsDto.getStartDate() != null) {
            goals.setStartDate(goalsDto.getStartDate());
        } else {
            goals.setStartDate(goal.getStartDate());
        }

        if (goalsDto.getTargetDate() != null) {
            goals.setTargetDate(goalsDto.getTargetDate());
        } else {
            goals.setTargetDate(goal.getTargetDate());
        }

        goals.setUser(user);
        goals.setId(goalId);
        goalsRepository.save(goals);
    }

    @Override
    public void addAmount (UUID goalId, double currentAmount) {
        Goals goal = goalsRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));
        goal.setCurrentAmount(goal.getCurrentAmount() + currentAmount);
        goalsRepository.save(goal);
    }

    @Override
    public GoalsDto getGoal (UUID goalId) {
        Goals goal = goalsRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));
        GoalsDto goalsDto = goalsMapper.toDto(goal);
        double remainingAmount = goal.getTargetAmount() - goal.getCurrentAmount();
        goalsDto.setRemainingAmount(remainingAmount);
        return goalsDto;
    }

}
