package com.app.mapper;

import com.app.Dto.CategoryDto;
import com.app.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends EntityMapperImpl<CategoryDto, Category> {
    public CategoryMapper () {
        setDtoClass(CategoryDto.class);
        setEntityClass(Category.class);
    }
}
