package com.restaurant.api.repositories;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurant.api.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String usermane);

	Boolean existsByEmail(String email);

	@Query("SELECT COUNT(*) FROM User u WHERE u.createdAt >= :today")
	public Long countNewUsers(Date today);


}
