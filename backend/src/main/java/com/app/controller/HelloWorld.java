package com.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hello_world")
@RequiredArgsConstructor
public class HelloWorld {

    @GetMapping("/public")
    public String helloWorldPublic () {
        return "Hello World Public!";
    }

    @GetMapping("/private")
    public String helloWorldPrivate (
    ) {
        return "Hello World Private!";
    }

}
