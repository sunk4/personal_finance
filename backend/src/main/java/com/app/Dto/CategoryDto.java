package com.app.Dto;

import com.app.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto extends BaseEntity {
    private String name;
    private String type;
    private String color;
    private UserDto user;
}
