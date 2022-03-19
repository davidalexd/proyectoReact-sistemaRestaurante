package com.restaurant.api.dto.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentRequest implements Serializable {
    private String paymentId;
    private Long amount;
}
