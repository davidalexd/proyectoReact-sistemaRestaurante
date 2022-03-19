package com.restaurant.api.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/docs")
public class DocsController {

    @GetMapping
    public String home(){
        return "views/index";
    }

    @GetMapping("/auth")
    public String auth(){
        return "views/auth";
    }

    @GetMapping("/users")
    public String users(){
        return "views/users";
    }

    @GetMapping("/products")
    public String products(){
        return "views/products";
    }

    @GetMapping("/categories")
    public String categories(){
        return "views/categories";
    }
    @GetMapping("/orders")
    public String orders(){
        return "views/orders";
    }

    @GetMapping("/payments")
    public String payments(){
        return "views/payments";
    }
    @GetMapping("/payment-methods")
    public String methods(){
        return "views/methods";
    }

}
