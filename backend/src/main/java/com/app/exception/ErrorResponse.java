package com.app.exception;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@Setter
@Builder
public class ErrorResponse {
    private final String message;
    private final int code;
    private final LocalDateTime timestamp;

}
