package com.restaurant.api.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.restaurant.api.models.Category;


@Repository
@Transactional
public class CategoryDaoImpl extends AbstractSession implements CategoryDao{

	
	
	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from Category",Category.class).list();
	}

	@Override
	public Category findCategoryById(Long idCategory) {
		// TODO Auto-generated method stub
		return getSession().get(Category.class, idCategory);
	}

	@Override
	public void saveCategory(Category category) {
		// TODO Auto-generated method stub
		getSession().save(category);
	}

	@Override
	public void updateCategory(Category category) {
		// TODO Auto-generated method stub
		getSession().update(category);
	}

	@Override
	public void deleteCategoryById(Long idCategory) {
		// TODO Auto-generated method stub
		Category category = findCategoryById(idCategory);
		if(category != null) {
			getSession().delete(category);
		}
	}

}
