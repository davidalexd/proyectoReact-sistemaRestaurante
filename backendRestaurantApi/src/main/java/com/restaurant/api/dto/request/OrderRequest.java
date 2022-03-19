package com.restaurant.api.dto.request;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
	private Long iduser;
	private String status;
	private Long subtotal;
	private List<OrderDetailRequest> orders;
	private String create_time;
	private Long payment_method;
}
