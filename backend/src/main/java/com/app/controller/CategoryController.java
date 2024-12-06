package com.app.controller;

import com.app.Dto.CategoryDto;
import com.app.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Void> createCategory (@RequestBody CategoryDto categoryDto, @RequestAttribute("userId") UUID userId) {
        categoryService.createCategory(categoryDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories (@RequestAttribute("userId") UUID userId) {
        return ResponseEntity.ok(categoryService.getCategories(userId));
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<CategoryDto> getCategory (@PathVariable UUID categoryId) {
        return ResponseEntity.ok(categoryService.getCategory(categoryId));
    }

    @DeleteMapping("{categoryId}")
    public ResponseEntity<Void> deleteCategory (@PathVariable UUID categoryId) {
        categoryService.deleteCategory(categoryId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("{categoryId}")
    public ResponseEntity<Void> updateCategory (@PathVariable UUID categoryId, @RequestBody CategoryDto categoryDto) {
        categoryService.updateCategory(categoryId, categoryDto);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
