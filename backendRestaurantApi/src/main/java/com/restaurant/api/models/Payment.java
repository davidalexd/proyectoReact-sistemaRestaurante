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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "payment")
public class Payment implements Serializable{

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_payment")
	private Long idPayment;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_order")
	@JsonIgnore
	private OrderUser orderUser;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_payment_method")
	private PaymentMethod paymentMethod;
	
	@Column(name = "status_payment")
	private boolean statusPayment;
	public Payment() {
		super();
	}
	public Payment(OrderUser orderUser, PaymentMethod paymentMethod, boolean statusPayment) {
		super();
		this.orderUser = orderUser;
		this.paymentMethod = paymentMethod;
		this.statusPayment = statusPayment;
	}
	public Long getIdPayment() {
		return idPayment;
	}
	public OrderUser getOrderUser() {
		return orderUser;
	}
	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}
	public boolean isStatusPayment() {
		return statusPayment;
	}
	public void setIdPayment(Long idPayment) {
		this.idPayment = idPayment;
	}
	public void setOrderUser(OrderUser orderUser) {
		this.orderUser = orderUser;
	}
	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public void setStatusPayment(boolean statusPayment) {
		this.statusPayment = statusPayment;
	}
	
	
	private static final long serialVersionUID = 1222008344275953421L;		
	
}
