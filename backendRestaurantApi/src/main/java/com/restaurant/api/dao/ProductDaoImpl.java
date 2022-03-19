package com.restaurant.api.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.restaurant.api.models.Product;


@Repository
@Transactional
public class ProductDaoImpl extends AbstractSession implements ProductDao {

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from Product",Product.class).list();
	}

	@Override
	public List<Product> getAllProductsByCategory(Long idCategory) {
		return getSession().createQuery("select p from Product p JOIN p.category c WHERE p.category.idCategory = :id")
				.setParameter("id", idCategory).list();
	}
	
	
	@Override
	public Product findProductById(Long idProduct) {
		// TODO Auto-generated method stub
		return getSession().get(Product.class, idProduct);
	}

	@Override
	public void saveProduct(Product product) {
		// TODO Auto-generated method stub
		getSession().save(product);
	}

	@Override
	public void updateProduct(Product product) {
		// TODO Auto-generated method stub
		getSession().update(product);
	}

	@Override
	public void deleteProductById(Long idProduct) {
		// TODO Auto-generated method stub
		Product product = findProductById(idProduct);
		if(product != null) {
			getSession().delete(product);
		}
	}

	
	
}
