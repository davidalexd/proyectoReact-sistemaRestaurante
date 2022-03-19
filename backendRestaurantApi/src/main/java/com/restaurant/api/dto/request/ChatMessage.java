package com.restaurant.api.dto.request;

import lombok.Data;

@Data
public class ChatMessage {
    private String message;
    private String sender;
    private String recipient;



}
