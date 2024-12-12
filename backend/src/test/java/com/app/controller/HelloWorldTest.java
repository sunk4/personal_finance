package com.app.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = HelloWorld.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class HelloWorldTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void helloWorldPublic () throws Exception {
        mockMvc.perform(get("/hello_world/public"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World Public!"));
    }

    @Test
    void helloWorldPrivate () throws Exception {
        mockMvc.perform(get("/hello_world/private"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World Private!"));
    }

}