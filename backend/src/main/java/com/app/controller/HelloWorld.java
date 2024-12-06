package com.app.controller;

import com.app.Dto.UserDto;
import com.app.entity.User;
import com.app.mapper.UserMapper;
import com.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("hello_world")
@RequiredArgsConstructor
public class HelloWorld {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping("/public")
    public String helloWorldPublic () {
        return "Hello World Public!";
    }

    @GetMapping("/private")
    public String helloWorldPrivate (
    ) {
        return "Hello World Private!";
    }

    @GetMapping("/user")
    public String getUserId (@AuthenticationPrincipal Jwt jwt) {
        UUID keyCloakId = UUID.fromString(jwt.getClaim("sub"));

        String name = jwt.getClaim("preferred_username");
        String email = jwt.getClaim("email");
        Optional<User> foundUserOptional = userRepository.findById(keyCloakId);

        if (foundUserOptional.isEmpty()) {
            System.out.println("User does not exist, creating new user");
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setId(keyCloakId);
            userRepository.save(newUser);
            return "created";
        } else {
            User foundUser = foundUserOptional.get();
            UserDto foundUserDto = userMapper.toDto(foundUser);
            System.out.println("User already exists: " + foundUserDto.toString());
            return "user id: " + keyCloakId;
        }
    }
}
