package com.restaurant.api.models;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "user")
@Data
public class User implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private Long idUser;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_profile")
	@JsonIgnore
	private Profile profile;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(	name = "role_user", 
				joinColumns = @JoinColumn(name = "id_user"), 
				inverseJoinColumns = @JoinColumn(name = "id_role"))
	private Set<RoleUser> roles = new HashSet<>();



	@Column(name = "username")
	@NotBlank
	private String username;
	
	@Email
	@Column(name = "email")
	@NotBlank
	private String email;
	
	@Column(name = "password")
	@NotBlank
	@JsonIgnore
	private String password;

	@CreationTimestamp
	@Column(name = "created_at")
	private Timestamp createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private Timestamp updatedAt;

	public User() {
		super();
	}
	
	public User(@NotBlank String username, @Email @NotBlank String email, @NotBlank String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}





	private static final long serialVersionUID = -2992223152926069389L;
	
	
}
