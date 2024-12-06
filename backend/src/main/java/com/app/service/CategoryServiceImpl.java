package com.app.service;

import com.app.Dto.CategoryDto;
import com.app.Dto.UserDto;
import com.app.entity.Category;
import com.app.entity.User;
import com.app.mapper.CategoryMapper;
import com.app.mapper.UserMapper;
import com.app.repository.CategoryRepository;
import com.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public void createCategory (CategoryDto categoryDto, UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserDto userDto = userMapper.toDto(user.get());
            categoryDto.setUser(userDto);
            categoryRepository.save(categoryMapper.toEntity(categoryDto));
        } else {
            throw new RuntimeException("User not found");
        }

    }

    @Override
    public List<CategoryDto> getCategories (UUID userId) {
        List<Category> categories = categoryRepository.findByUserId(userId);
        return categories.stream().map(categoryMapper::toDto).collect(Collectors.toList());

    }

    @Override
    public CategoryDto getCategory (UUID categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.map(categoryMapper::toDto).orElse(null);
    }

    @Override
    public void deleteCategory (UUID categoryId) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public void updateCategory (UUID categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        category.setName(categoryDto.getName());
        category.setType(categoryDto.getType());
        category.setColor(categoryDto.getColor());

        categoryRepository.save(category);
    }
}
