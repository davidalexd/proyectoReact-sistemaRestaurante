package com.restaurant.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.api.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
}
