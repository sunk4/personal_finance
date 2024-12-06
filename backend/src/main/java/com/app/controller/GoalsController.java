package com.app.controller;

import com.app.Dto.GoalsDto;
import com.app.service.GoalsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("goals")
@RequiredArgsConstructor
public class GoalsController {
    private final GoalsService goalsService;

    @PostMapping
    public ResponseEntity<Void> createGoal (
            @RequestBody GoalsDto goalsDto,
            @RequestAttribute("userId") UUID userId
    ) {
        goalsService.createGoal(goalsDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<GoalsDto>> getGoals (
            @RequestAttribute("userId") UUID userId

    ) {
        return ResponseEntity.ok(goalsService.getGoals(userId));
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal (
            @PathVariable UUID goalId
    ) {
        goalsService.deleteGoal(goalId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{goalId}")
    public ResponseEntity<Void> updateGoal (
            @PathVariable UUID goalId,
            @RequestBody GoalsDto goalsDto
    ) {
        goalsService.updateGoal(goalId, goalsDto);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{goalId}/add-amount")
    public ResponseEntity<Void> addAmount (
            @PathVariable UUID goalId,
            @RequestBody GoalsDto goalsDto
    ) {
        goalsService.addAmount(goalId, goalsDto.getCurrentAmount());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<GoalsDto> getGoal (
            @PathVariable UUID goalId
    ) {
        return ResponseEntity.ok(goalsService.getGoal(goalId));
    }

}
