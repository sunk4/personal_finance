package com.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.UUID;

@ControllerAdvice
public class GlobalControllerAdvice {
    @ModelAttribute
    public void populateUserId (
            @AuthenticationPrincipal Jwt jwt,
            HttpServletRequest request
    ) {
        if (jwt != null) {
            UUID userId = UUID.fromString(jwt.getClaim("sub"));
            request.setAttribute("userId", userId);
        }
    }
}
