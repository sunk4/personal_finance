package com.app.mapper;


import com.app.Dto.UserDto;
import com.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends EntityMapperImpl<UserDto, User> {
    public UserMapper() {
        setDtoClass(UserDto.class);
        setEntityClass(User.class);
    }
}