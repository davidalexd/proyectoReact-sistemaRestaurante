package com.restaurant.api.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.restaurant.api.models.User;


@Repository
@Transactional
public class UserDaoImpl extends AbstractSession implements UserDao{

	@Override
	public List<User> getAllUsers() {
		
		return getSession().createQuery("from User",User.class).list();
	}

	@Override
	public void saveUser(User user) {
		// TODO Auto-generated method stub
		getSession().save(user);
	}

	@Override
	public void deleteUserById(Long idUser) {
		// TODO Auto-generated method stub
		User user = findUserById(idUser);
		if(user != null) {
			getSession().delete(user);
		}
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		getSession().update(user);
	}

	@Override
	public User findUserById(Long idUser) {
		// TODO Auto-generated method stub
		
		return getSession().get(User.class, idUser);
	}

	@Override
	public User findUserByName(String name) {
		// TODO Auto-generated method stub
		return getSession().createQuery("from User where nameUser = :nameuser",User.class)
				.setParameter("nameuser", name).uniqueResult();
	}

	
	
}
