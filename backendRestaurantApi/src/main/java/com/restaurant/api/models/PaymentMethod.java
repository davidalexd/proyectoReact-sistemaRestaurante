package com.restaurant.api.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "payment_method")
public class PaymentMethod implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_payment_method")
	private Long idPaymentMethod;
	
	@Column(name = "name_payment_method")
	private String namePaymentMethod;
	

	public PaymentMethod(String namePaymentMethod) {
		super();
		this.namePaymentMethod = namePaymentMethod;
	}
	public PaymentMethod() {
		super();
	}
	public Long getIdPaymentMethod() {
		return idPaymentMethod;
	}
	public String getNamePaymentMethod() {
		return namePaymentMethod;
	}
	public void setIdPaymentMethod(Long idPaymentMethod) {
		this.idPaymentMethod = idPaymentMethod;
	}
	public void setNamePaymentMethod(String namePaymentMethod) {
		this.namePaymentMethod = namePaymentMethod;
	}
	
	private static final long serialVersionUID = 5462374591608430818L;
	
}
