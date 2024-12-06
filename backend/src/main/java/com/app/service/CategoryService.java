package com.app.service;

import com.app.Dto.CategoryDto;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    void createCategory (CategoryDto categoryDto, UUID userId);

    List<CategoryDto> getCategories (UUID userId);

    CategoryDto getCategory (UUID categoryId);

    void deleteCategory (UUID categoryId);

    void updateCategory (UUID categoryId, CategoryDto categoryDto);
}
