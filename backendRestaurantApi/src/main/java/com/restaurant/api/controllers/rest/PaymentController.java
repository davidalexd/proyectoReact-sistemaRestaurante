package com.restaurant.api.controllers.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.restaurant.api.dto.response.MessageResponse;
import com.restaurant.api.dto.request.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.restaurant.api.models.Payment;
import com.restaurant.api.repositories.PaymentRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "api/payments")
public class PaymentController {

	@Autowired
	PaymentRepository paymentRepository;
	
	@GetMapping
	public List<Payment> getAll(){
		return paymentRepository.findAll();
	}
	@GetMapping(value = "/{id}")
	public Payment getById(@PathVariable("id") Long id) {
		return paymentRepository.findById(id).get();
	}
	
	@PostMapping
	public Payment create(@RequestBody Payment requestPayment) {
		return paymentRepository.save(requestPayment);
	}

	@PostMapping("/stripe")
	public ResponseEntity<?> createPaymentStripe(@RequestBody PaymentRequest paymentRequest){
		Stripe.apiKey = "sk_test_51JufoqDOx3uLFoGurrcjLUA7bhhpcA9RI0e5ai1BA1fxxb9Xzqqsl8Kmlye6fnXzsn7diGYrbaIO9scTS31EofFA00MUZZ5Z9y";
		Map<String, Object> params = new HashMap<>();
		params.put("payment_method",paymentRequest.getPaymentId());
		params.put("amount",paymentRequest.getAmount() * 100);
		params.put("description","DELIBAKERY S.A.C");
		params.put("currency","USD");
		params.put("confirm",true);
		try {
			PaymentIntent paymentIntent = PaymentIntent.create(params);
			return new ResponseEntity<MessageResponse>(new MessageResponse("The payment was completed"), HttpStatus.CREATED);
		} catch (StripeException e) {
			return new ResponseEntity<MessageResponse>(new MessageResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}


}
