package com.restaurant.api.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.restaurant.api.models.RoleUser;

@Repository
@Transactional
public class RoleUserDaoImpl extends AbstractSession implements RoleUserDao{

	@Override
	public void saveRoleUser(RoleUser roleUser) {
		getSession().save(roleUser);
	}
	
	@Override
	public List<RoleUser> findAllRoles() {
		return getSession().createQuery("from RoleUser",RoleUser.class).list();
	}

	@Override
	public RoleUser findRoleById(Long idRole) {
		// TODO Auto-generated method stub
		return getSession().get(RoleUser.class, idRole);
	}

	@Override
	public void updateRole(RoleUser role) {
		// TODO Auto-generated method stub
		getSession().update(role);
	}

	@Override
	public void deleteRoleById(Long idRole) {
		// TODO Auto-generated method stub
		RoleUser role = findRoleById(idRole);
		
		if(role!=null) {
			getSession().delete(role);
		}
	}

}
