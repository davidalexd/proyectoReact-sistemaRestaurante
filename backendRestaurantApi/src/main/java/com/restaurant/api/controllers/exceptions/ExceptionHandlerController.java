package com.restaurant.api.controllers.exceptions;

import com.restaurant.api.dto.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.NoHandlerFoundException;



@RestControllerAdvice
@RequestMapping("/api")
public class ExceptionHandlerController{
	
	@ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(value= HttpStatus.NOT_FOUND)
    @ResponseBody
    public MessageResponse requestHandlingNoHandlerFound() {
        return new MessageResponse("page not found");
    }
	
}
