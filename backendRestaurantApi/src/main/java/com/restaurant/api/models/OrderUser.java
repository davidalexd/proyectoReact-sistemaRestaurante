package com.restaurant.api.models;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Getter
@Setter
@Table(name = "order_user")
public class OrderUser implements Serializable {	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_order")
	private Long idOrder;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user")
	private User user;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "orderUser")
	@JsonManagedReference
	private Set<Payment> payment;
	
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "orderUser")
	@JsonManagedReference
	private Set<OrderDetail> orderDetails;
	
	@Column(name = "status_order")
	private String statusOrder;
	
	@Column(name = "desc_order")
	private String description;
	
	@Column(name = "total_order_price")
	private long totalPrice;

	@Column(name = "created_at")
	@CreationTimestamp
	private Timestamp createdAt;

	@Column(name = "updated_at")
	@UpdateTimestamp
	private Timestamp updateAt;

	
	public OrderUser() {
		super();
	}
	public OrderUser(User user, String statusOrder, String description, long totalPrice) {
		super();
		this.user = user;
		this.statusOrder = statusOrder;
		this.description = description;
		this.totalPrice = totalPrice;
	}
	
	private static final long serialVersionUID = 2719374845416289773L;
	
}
