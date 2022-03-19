package com.restaurant.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.api.dao.ProductDao;
import com.restaurant.api.models.Product;


@Service
@Transactional
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductDao _productDao;
	
	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return _productDao.getAllProducts();
	}

	@Override
	public List<Product> getAllProducsByCategory(Long idCategory) {
		// TODO Auto-generated method stub
		return _productDao.getAllProductsByCategory(idCategory);
	}
	
	@Override
	public Product findProductById(Long idProduct) {
		// TODO Auto-generated method stub
		return _productDao.findProductById(idProduct);
	}

	@Override
	public void saveProduct(Product product) {
		// TODO Auto-generated method stub
		_productDao.saveProduct(product);
	}

	@Override
	public void updateProduct(Product product) {
		// TODO Auto-generated method stub
		_productDao.updateProduct(product);
	}

	@Override
	public void deleteProductById(Long idProduct) {
		// TODO Auto-generated method stub
		_productDao.deleteProductById(idProduct);
	}

}
