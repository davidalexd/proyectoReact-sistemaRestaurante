package com.restaurant.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.api.models.RoleUser;

@Repository
public interface RoleRepository extends JpaRepository<RoleUser, Long>{

	Optional<RoleUser> findByNameRole(String nameRole);
	
}
