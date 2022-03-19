package com.restaurant.api.service;

import java.util.List;

import com.restaurant.api.models.RoleUser;

public interface RoleUserService {

	List<RoleUser> findAllRoles();

	void saveRoleUser(RoleUser roleUser);
	
	RoleUser findRoleById(Long idRole);
	
	void updateRole(RoleUser role);
	
	void deleteRoleById(Long idRole);
	
}
