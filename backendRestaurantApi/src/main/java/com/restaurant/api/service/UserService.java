package com.restaurant.api.service;

import java.util.List;

import com.restaurant.api.models.User;

public interface UserService {

List<User> getAllUsers();
	
	void saveUser(User user);
	
	void deleteUserById(Long idUser);
	
	void updateUser(User user);
	
	User findUserById(Long idUser);
	
	User findUserByName(String name);
	
}
