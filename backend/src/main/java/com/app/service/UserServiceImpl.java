package com.app.service;

import com.app.entity.User;
import com.app.mapper.UserMapper;
import com.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CacheManager cacheManager;

    @Override
    @Cacheable(value = "userCache", key = "#userId")
    public boolean isUserCached (UUID userId) {
        return userRepository.findById(userId).isPresent();
    }

    @Override
    public void cacheUser (UUID userId) {
        Objects.requireNonNull(cacheManager.getCache("userCache")).put(userId, true);
    }

    @Override
    public void registerUser (Jwt jwt) {
        UUID keyCloakId = UUID.fromString(jwt.getClaim("sub"));

        String name = jwt.getClaim("preferred_username");
        String email = jwt.getClaim("email");
        Optional<User> foundUserOptional = userRepository.findById(keyCloakId);

        if (foundUserOptional.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setId(keyCloakId);
            userRepository.save(newUser);
        }
    }
}
