package com.restaurant.api.dao;

import java.util.List;

import com.restaurant.api.models.User;

public interface UserDao {

	List<User> getAllUsers();
	
	void saveUser(User user);
	
	void deleteUserById(Long idUser);
	
	void updateUser(User user);
	
	User findUserById(Long idUser);
	
	User findUserByName(String name);
	
}
