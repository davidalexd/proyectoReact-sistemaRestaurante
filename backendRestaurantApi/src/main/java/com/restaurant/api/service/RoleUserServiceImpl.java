package com.restaurant.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.api.dao.RoleUserDao;
import com.restaurant.api.models.RoleUser;

@Service
@Transactional
public class RoleUserServiceImpl implements RoleUserService{

	@Autowired
	RoleUserDao _roleUserDao;

	@Override
	public void saveRoleUser(RoleUser roleUser) {
		_roleUserDao.saveRoleUser(roleUser);
	}

	@Override
	public List<RoleUser> findAllRoles() {
		return _roleUserDao.findAllRoles();
	}

	@Override
	public RoleUser findRoleById(Long idRole) {
		// TODO Auto-generated method stub
		return _roleUserDao.findRoleById(idRole);
	}

	@Override
	public void updateRole(RoleUser role) {
		// TODO Auto-generated method stub
		_roleUserDao.updateRole(role);
	}

	@Override
	public void deleteRoleById(Long idRole) {
		// TODO Auto-generated method stub
		_roleUserDao.deleteRoleById(idRole);
	}
	
}
