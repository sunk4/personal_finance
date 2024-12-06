package com.app.service;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

public interface UserService {
    void registerUser (@AuthenticationPrincipal Jwt jwt);

    boolean isUserCached (UUID userId);

    void cacheUser (UUID userId);
}
