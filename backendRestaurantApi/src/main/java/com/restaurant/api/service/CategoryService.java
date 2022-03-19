package com.restaurant.api.service;

import java.util.List;

import com.restaurant.api.models.Category;

public interface CategoryService {

	List<Category> getAllCategories();
	
	Category findCategoryById(Long idCategory);
	
	void saveCategory(Category category);
	
	void updateCategory(Category category);
	
	void deleteCategoryById(Long idCategory);
	
	
}
