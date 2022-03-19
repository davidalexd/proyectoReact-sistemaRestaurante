package com.restaurant.api.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;
@Entity
@Table(name = "order_detail")
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetail implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_order_detail")
	private Long idOrderDetail;
	
	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.MERGE)
	@JoinColumn(name = "id_product")
	@NonNull
	private Product product;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_order")
	@NonNull
	@JsonIgnore
	private OrderUser orderUser;
	
	@Column(name = "quantity")

	@NonNull
	private Integer quantity;

	private static final long serialVersionUID = -5638346545812377702L;
	
}
