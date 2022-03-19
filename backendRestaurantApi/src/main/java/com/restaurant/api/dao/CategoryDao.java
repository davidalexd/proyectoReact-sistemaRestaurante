package com.restaurant.api.dao;

import java.util.List;

import com.restaurant.api.models.Category;

public interface CategoryDao {

	List<Category> getAllCategories();
	
	Category findCategoryById(Long idCategory);
	
	void saveCategory(Category category);
	
	void updateCategory(Category category);
	
	void deleteCategoryById(Long idCategory);
	
}
