package com.restaurant.api.service;

import java.util.List;

import com.restaurant.api.models.Product;

public interface ProductService {

	List<Product> getAllProducts();
	
	List<Product> getAllProducsByCategory(Long idCategory);
	
	Product findProductById(Long idProduct);
	
	void saveProduct(Product product);
	
	void updateProduct(Product product);
	
	void deleteProductById(Long idProduct);
	
	
}
