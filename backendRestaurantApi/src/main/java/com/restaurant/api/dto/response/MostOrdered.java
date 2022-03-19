package com.restaurant.api.dto.response;

import com.restaurant.api.models.Product;
import lombok.Data;
import lombok.NonNull;

@Data
public class MostOrdered {

    @NonNull
    private Product product;
    @NonNull
    private Long total;




}
