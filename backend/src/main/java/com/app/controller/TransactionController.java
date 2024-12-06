package com.app.controller;

import com.app.Dto.TransactionDto;
import com.app.common.PageResponse;
import com.app.enums.TransactionType;
import com.app.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("transaction")
@RequiredArgsConstructor

public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Void> createTransaction (
            @RequestBody TransactionDto transactionDto, @RequestAttribute("userId") UUID userId
    ) {
        transactionService.createTransaction(transactionDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<PageResponse<TransactionDto>> getTransactions (
            @RequestAttribute("userId") UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) TransactionType transactionType,
            @RequestParam(defaultValue = "latest") String sort,
            @RequestParam(required = false) UUID accountId
    ) {
        return ResponseEntity.ok(transactionService.getTransactions(page,
                size, transactionType, sort, accountId, userId));
    }

    @GetMapping("/export-pdf/{accountId}")
    public ResponseEntity<byte[]> exportTransactionsToPdf (
            @PathVariable UUID accountId
    ) {

        byte[] pdfBytes = transactionService.exportTransactionsToPdf(accountId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "transactions.pdf");
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

}
