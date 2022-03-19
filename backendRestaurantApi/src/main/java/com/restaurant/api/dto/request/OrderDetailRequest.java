package com.restaurant.api.dto.request;

import lombok.Data;

@Data
public class OrderDetailRequest {
	private Long idproduct;
	private int quantity;
}
