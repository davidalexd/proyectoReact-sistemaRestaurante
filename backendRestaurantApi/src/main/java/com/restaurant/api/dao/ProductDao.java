package com.restaurant.api.dao;

import java.util.List;

import com.restaurant.api.models.Product;

public interface ProductDao {

	List<Product> getAllProducts();
	
	List<Product> getAllProductsByCategory(Long idCategory);
	
	Product findProductById(Long idProduct);
	
	void saveProduct(Product product);
	
	void updateProduct(Product product);
	
	void deleteProductById(Long idProduct);
	
 	
}
