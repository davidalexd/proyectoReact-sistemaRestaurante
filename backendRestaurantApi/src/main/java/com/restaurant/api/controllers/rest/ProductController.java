package com.restaurant.api.controllers.rest;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.storage.Blob;
import com.restaurant.api.models.Category;
import com.restaurant.api.models.Product;
import com.restaurant.api.dto.response.MessageResponse;
import com.restaurant.api.service.CategoryService;
import com.restaurant.api.service.FirebaseService;
import com.restaurant.api.service.ProductService;
import com.restaurant.api.utils.ImageTools;

@RestController
@RequestMapping(value = "/api/products")
@CrossOrigin
public class ProductController {

	@Autowired
	ProductService _productService;
	@Autowired
	CategoryService _categoryService;
	
	@Autowired
	FirebaseService firebaseService;
	
	
	
	@RequestMapping(value = "",method = RequestMethod.GET)
	public ResponseEntity<?> getAllProducts(){
		
		List<Product> products = _productService.getAllProducts();
		if(products == null || products.isEmpty()) {
			return new ResponseEntity<>(new MessageResponse("There are NOT products"),HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "",method = RequestMethod.POST,headers = "Accept=application/json")
	public ResponseEntity<?> saveProduct(@RequestBody Product product){
		if(product == null || product.getNameProduct()== null) {
			return new ResponseEntity<>(new MessageResponse("Please provide the object or the name of the product"),HttpStatus.BAD_REQUEST);
		}
		if(product.getCategory().getIdCategory() == null) {
			return new ResponseEntity<>(new MessageResponse("Provide the id Category"),HttpStatus.BAD_REQUEST);
		}
		try {
			Category category = _categoryService.findCategoryById(product.getCategory().getIdCategory());
			product.setCategory(category);
			_productService.saveProduct(product);	
			return new ResponseEntity<>(product,HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(new MessageResponse("Error" + e.getStackTrace().toString()),HttpStatus.CREATED);
		}
	}
	
	@RequestMapping(value = "/categories/{id}",method = RequestMethod.GET)
	public ResponseEntity<?> getAllProductsByCategory(@PathVariable("id") Long idCategory){
		if(idCategory== null || idCategory<=0) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST); 
		}
		Category category = _categoryService.findCategoryById(idCategory);
		if(category == null) {
			return new ResponseEntity<>(new MessageResponse("Category NOT FOUND"),HttpStatus.NOT_FOUND);
		}
		List<Product> products = _productService.getAllProducsByCategory(idCategory);
		if(products == null || products.isEmpty()) {
			return new ResponseEntity<>(new MessageResponse("There are NOT products with this category"),HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(products,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}",method = RequestMethod.GET)
	public ResponseEntity<?> findProductById(@PathVariable(name = "id") Long idProduct){
		if(idProduct== null || idProduct<=0) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST); 
		}
		Product product = _productService.findProductById(idProduct);
		
		if(product == null) {
			return new ResponseEntity<>(new MessageResponse("Product NOT found"),HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Product>(product,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}",method = RequestMethod.PATCH,headers = "Accept=application/json")
	public ResponseEntity<?> updateProductById(@PathVariable(name = "id") Long idProduct,@RequestBody Product product){
		if(idProduct== null || idProduct<=0) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST); 
		}
		if(product == null) {
			return new ResponseEntity<>(new MessageResponse("Product is required"),HttpStatus.NOT_FOUND);
		}
		
		
		Product currentProduct= _productService.findProductById(idProduct);
		if(currentProduct == null) {
			return new ResponseEntity<>(new MessageResponse("Product NOT found"),HttpStatus.NOT_FOUND);
		}
		
		
		currentProduct.setNameProduct(product.getNameProduct());
		currentProduct.setDescription(product.getDescription());
		currentProduct.setAvailableProduct(product.isAvailableProduct());
		currentProduct.setCategory(product.getCategory());
		currentProduct.setPriceProduct(product.getPriceProduct());
		_productService.updateProduct(currentProduct);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/{id}",method = RequestMethod.DELETE, headers = "Accept=application/json")
	public ResponseEntity<?> deleteProductById(@PathVariable(name = "id") Long idProduct){
		if(idProduct == null || idProduct <=0) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST); 
		}
		Product currentProduct= _productService.findProductById(idProduct);
		if(currentProduct == null) {
			return new ResponseEntity<>(new MessageResponse("Product NOT found"),HttpStatus.NOT_FOUND);
		}
		
		_productService.deleteProductById(idProduct);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK); 
	}
	
	public static final String PRODUCT_IMAGES_FOLDER = "images/products/";
	
	@RequestMapping( value = "/{id}/image",method = RequestMethod.POST,headers=("content-type=multipart/form-data"))
	public ResponseEntity<?> asignImage(@PathVariable(name = "id") Long id,
										@RequestParam(value = "file") MultipartFile multipartFile,
										UriComponentsBuilder uriComponentsBuilder){
		if(id == null || id <= 0 ) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST);
		}
		if(multipartFile.isEmpty()) {
			return new ResponseEntity<>(new MessageResponse("The image is required"),HttpStatus.NO_CONTENT);
		}
		Product product = _productService.findProductById(id);
		if(product == null) {
			return new ResponseEntity<>(new MessageResponse("The product does NOT exist"),HttpStatus.NOT_FOUND);
		}
		
		if(product.getImage() != null) {
			String fileName = product.getImage();
			firebaseService.checkIfExists(PRODUCT_IMAGES_FOLDER + fileName);
		}
		
		try {
			
			String fileName = firebaseService.generateFileName(id,"product-image",multipartFile.getContentType().split("/")[1]);
			product.setImage(fileName);
			byte[] imageResized = ImageTools.resize(multipartFile.getBytes(), 400, 400);
			Blob blob = firebaseService.saveFile(imageResized,PRODUCT_IMAGES_FOLDER + fileName, "jpg");
			byte[] createdImage = blob.getContent();
			_productService.updateProduct(product);
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(createdImage);
			
		}catch (Exception e) {
			return new ResponseEntity<>(new MessageResponse("A error uploading the image: " + e.getStackTrace().toString()),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping( value = "/{id}/image",method = RequestMethod.GET)
	public ResponseEntity<?> getProductImage(@PathVariable(name = "id") Long id){
		if(id == null || id <= 0 ) {
			return new ResponseEntity<>(new MessageResponse("The id product is required"),HttpStatus.BAD_REQUEST);
		}
		Product product = _productService.findProductById(id);
		if(product == null) {
			return new ResponseEntity<>(new MessageResponse("The product does NOT exist"),HttpStatus.NOT_FOUND);
		}
		if(product.getImage() == null || product.getImage().isEmpty()) {
			return new ResponseEntity<>(new MessageResponse("Image not found"),HttpStatus.NOT_FOUND);
		}
		try {
			String fileName = product.getImage();
			Blob blob = firebaseService.getFile(PRODUCT_IMAGES_FOLDER + fileName);
			if(!blob.exists()) {
				throw new NotFoundException("Image not found", null, null, false);
			}
			byte[] image = blob.getContent();
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
			
			
		}catch (NotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageResponse("Error: " + e.getMessage()),HttpStatus.NOT_FOUND);
		}
		catch (Exception e) {
			return new ResponseEntity<>(new MessageResponse("A error with image: " + e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	
}
