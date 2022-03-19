package com.restaurant.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "product")
public class Product implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_product")
	private Long idProduct;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_category")
	private Category category;
	
	@Column(name = "name_product")
	private String nameProduct;
	
	@Column(name = "price_product")
	private long priceProduct;
	
	@Column(name = "available_product")
	private boolean availableProduct;
	
	@Column(name = "desc_product")
	private String description;
	
	@Column(name = "product_image")
	private String image;
	
	@OneToMany(mappedBy = "product")
	@JsonIgnore
	List<OrderDetail> orderDetails;

	public Product() {
		super();
	}

	public Product(Category category, String nameProduct, long priceProduct, boolean availableProduct,
			String description) {
		super();
		this.category = category;
		this.nameProduct = nameProduct;
		this.priceProduct = priceProduct;
		this.availableProduct = availableProduct;
		this.description = description;
	}


	public Long getIdProduct() {
		return idProduct;
	}


	public Category getCategory() {
		return category;
	}


	public String getNameProduct() {
		return nameProduct;
	}


	public long getPriceProduct() {
		return priceProduct;
	}


	public boolean isAvailableProduct() {
		return availableProduct;
	}


	public String getDescription() {
		return description;
	}


	public void setIdProduct(Long idProduct) {
		this.idProduct = idProduct;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public void setNameProduct(String nameProduct) {
		this.nameProduct = nameProduct;
	}


	public void setPriceProduct(long priceProduct) {
		this.priceProduct = priceProduct;
	}


	public void setAvailableProduct(boolean availableProduct) {
		this.availableProduct = availableProduct;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	private static final long serialVersionUID = -4546287916631672894L;	
	
}
