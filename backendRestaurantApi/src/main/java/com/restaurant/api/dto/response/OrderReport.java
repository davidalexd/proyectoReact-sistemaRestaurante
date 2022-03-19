package com.restaurant.api.dto.response;

import com.restaurant.api.models.User;
import lombok.Data;
import lombok.NonNull;

@Data
public class OrderReport {

    @NonNull
    private User user;
    @NonNull
    private String address;
    @NonNull
    private Long total;
    @NonNull
    private String status;

}
