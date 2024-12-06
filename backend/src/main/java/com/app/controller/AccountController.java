package com.app.controller;

import com.app.Dto.AccountDto;
import com.app.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<UUID> createAccount (@Valid @RequestBody AccountDto accountDto, @RequestAttribute("userId") UUID userId) {
        UUID accountId = accountService.createAccount(accountDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(accountId);
    }

    @GetMapping
    public ResponseEntity<List<AccountDto>> getAccounts (
            @RequestAttribute("userId") UUID userId
    ) {
        return ResponseEntity.ok(accountService.getAccounts(userId));
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDto> getAccount (
            @PathVariable UUID accountId
    ) {
        return ResponseEntity.ok(accountService.getAccount(accountId));
    }

    @PatchMapping("/{accountId}")
    public ResponseEntity<Void> updateAccount (
            @PathVariable UUID accountId,
            @Valid @RequestBody AccountDto accountDto
    ) {
        accountService.updateAccount(accountId, accountDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount (
            @PathVariable UUID accountId
    ) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
