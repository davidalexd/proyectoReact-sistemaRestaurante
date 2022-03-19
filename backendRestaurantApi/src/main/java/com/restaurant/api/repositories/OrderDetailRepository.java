package com.restaurant.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.api.models.OrderDetail;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od JOIN od.orderUser ou WHERE ou.createdAt >= ?1 and ou.createdAt <= ?2")
    public Long quantity(Date firstDate, Date secondDate);
}
