package com.app.controller;

import com.app.Dto.RecurringTransactionDto;
import com.app.service.RecurringTransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("recurring-transactions")
@RequiredArgsConstructor
public class RecurringTransactionController {

    private final RecurringTransactionService recurringTransactionService;

    @PostMapping
    public ResponseEntity<Void> createRecurringTransaction (
            @RequestBody RecurringTransactionDto recurringTransactionDto,
            @Valid @RequestAttribute("userId") UUID userId
    ) {
        recurringTransactionService.createRecurringTransaction(recurringTransactionDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<RecurringTransactionDto>> getRecurringTransactions (
            @RequestAttribute("userId") UUID userId,
            @RequestParam(required = false) String name
    ) {
        return ResponseEntity.ok(recurringTransactionService.getRecurringTransactions(userId, name));
    }

    @GetMapping("/sum")
    public ResponseEntity<Double> getRecurringTransactionsSum (
            @RequestAttribute("userId") UUID userId
    ) {
        return ResponseEntity.ok(recurringTransactionService.getRecurringTransactionsSum(userId));
    }

    @DeleteMapping("/{recurringTransactionId}")
    public ResponseEntity<Void> deleteRecurringTransaction (
            @PathVariable UUID recurringTransactionId
    ) {
        recurringTransactionService.deleteRecurringTransaction(recurringTransactionId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{recurringTransactionId}")
    public ResponseEntity<Void> updateRecurringTransaction (
            @PathVariable UUID recurringTransactionId,
            @Valid @RequestBody RecurringTransactionDto recurringTransactionDto
    ) {
        recurringTransactionService.updateRecurringTransaction(recurringTransactionId, recurringTransactionDto);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{recurringTransactionId}")
    public ResponseEntity<RecurringTransactionDto> getRecurringTransaction (
            @PathVariable UUID recurringTransactionId
    ) {
        return ResponseEntity.ok(recurringTransactionService.getRecurringTransaction(recurringTransactionId));
    }

}
