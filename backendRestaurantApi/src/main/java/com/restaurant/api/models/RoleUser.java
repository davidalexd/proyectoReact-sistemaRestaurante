package com.restaurant.api.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class RoleUser implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_role")
	private Long idRole;
	
	@Column(name = "name_role")
	private String nameRole;
	
	
	@ManyToMany(mappedBy = "roles")
	private List<User> users;
	
	public RoleUser() {
		super();
	}
	public RoleUser(String nameRole) {
		super();
		this.nameRole = nameRole;
	}
	
	public Long getIdRole() {
		return idRole;
	}
	public String getNameRole() {
		return nameRole;
	}
	public void setIdRole(Long idRole) {
		this.idRole = idRole;
	}
	public void setNameRole(String nameRole) {
		this.nameRole = nameRole;
	}
	
	private static final long serialVersionUID = -5115978469393994501L;
}

