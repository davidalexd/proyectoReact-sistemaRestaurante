package com.restaurant.api.controllers.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.api.models.PaymentMethod;
import com.restaurant.api.repositories.PaymentMethodRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/paymentmethods")
public class PaymentMethodController {

	@Autowired
	private PaymentMethodRepository paymentMethodRepository;
	
	@GetMapping
	public List<PaymentMethod> getAll(){
		return paymentMethodRepository.findAll();
	}
	
	@GetMapping(value = "/{id}")
	public Optional<PaymentMethod> getById(@PathVariable(name = "id") Long id) {
		return paymentMethodRepository.findById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public PaymentMethod create(@RequestBody PaymentMethod paymentMethod) {
		return paymentMethodRepository.save(paymentMethod);
	}
	
	@PutMapping(value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void update(@PathVariable(name = "id") Long id, @RequestBody PaymentMethod paymentMethod) {
		PaymentMethod currentPaymentMethod = paymentMethodRepository.findById(id).get();
		currentPaymentMethod.setNamePaymentMethod(paymentMethod.getNamePaymentMethod());
		paymentMethodRepository.save(currentPaymentMethod);
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable(name = "id") Long id) {
		paymentMethodRepository.deleteById(id);
	}
	
}
