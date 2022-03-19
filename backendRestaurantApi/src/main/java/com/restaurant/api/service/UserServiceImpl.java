package com.restaurant.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.api.dao.UserDao;
import com.restaurant.api.models.User;

@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao _userDao;
	
	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return _userDao.getAllUsers();
	}

	@Override
	public void saveUser(User user) {
		// TODO Auto-generated method stub
		_userDao.saveUser(user);
	}

	@Override
	public void deleteUserById(Long idUser) {
		// TODO Auto-generated method stub
		_userDao.deleteUserById(idUser);
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		_userDao.updateUser(user);
	}

	@Override
	public User findUserById(Long idUser) {
		// TODO Auto-generated method stub
		return _userDao.findUserById(idUser);
	}

	@Override
	public User findUserByName(String name) {
		// TODO Auto-generated method stub
		return _userDao.findUserByName(name);
	}

}
