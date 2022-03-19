package com.restaurant.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.api.dao.CategoryDao;
import com.restaurant.api.models.Category;


@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryDao _categoryDao;
	
	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return _categoryDao.getAllCategories();
	}

	@Override
	public Category findCategoryById(Long idCategory) {
		// TODO Auto-generated method stub
		return _categoryDao.findCategoryById(idCategory);
	}

	@Override
	public void saveCategory(Category category) {
		// TODO Auto-generated method stub
		_categoryDao.saveCategory(category);
	}

	@Override
	public void updateCategory(Category category) {
		// TODO Auto-generated method stub
		_categoryDao.updateCategory(category);
	}

	@Override
	public void deleteCategoryById(Long idCategory) {
		// TODO Auto-generated method stub
		_categoryDao.deleteCategoryById(idCategory);
	}

	
	
}
