package com.restaurant.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurant.api.models.PaymentMethod;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Long>{
	@Query("SELECT p FROM PaymentMethod p WHERE p.namePaymentMethod = ?1")
	PaymentMethod findByNamePaymentMethod(String namePaymentMethod);
}
