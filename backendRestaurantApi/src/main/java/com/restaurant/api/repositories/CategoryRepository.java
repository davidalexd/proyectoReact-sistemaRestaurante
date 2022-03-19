package com.restaurant.api.repositories;

import com.restaurant.api.models.Category;
import com.restaurant.api.dto.response.Chart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query("SELECT new com.restaurant.api.dto.response.Chart(c.nameCategory,COUNT(c)) " +
            " FROM Category c JOIN c.products p JOIN p.orderDetails " +
            " GROUP BY c")
    public List<Chart> countCategory();
}
