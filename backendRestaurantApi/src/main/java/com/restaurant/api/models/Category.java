package com.restaurant.api.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "category")
public class Category implements Serializable{


	private static final long serialVersionUID = 4849183077803629224L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_category")
	private Long idCategory;
	
	@OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
	private List<Product> products;
	
	@Column(name = "name_category")
	private String nameCategory;
	
	@Column(name = "desc_category")
	private String description;
	public Category() {
		super();
	}
	public Category(Long idCategory, String nameCategory, String description) {
		super();
		this.idCategory = idCategory;
		this.nameCategory = nameCategory;
		this.description = description;
	}
	public Long getIdCategory() {
		return idCategory;
	}
	public String getNameCategory() {
		return nameCategory;
	}
	public String getDescription() {
		return description;
	}
	public void setIdCategory(Long idCategory) {
		this.idCategory = idCategory;
	}
	public void setNameCategory(String nameCategory) {
		this.nameCategory = nameCategory;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
