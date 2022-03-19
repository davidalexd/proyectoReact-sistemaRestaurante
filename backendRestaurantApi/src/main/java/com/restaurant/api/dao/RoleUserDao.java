package com.restaurant.api.dao;

import com.restaurant.api.models.RoleUser;
import java.util.List;

public interface RoleUserDao {

	List<RoleUser> findAllRoles();

	void saveRoleUser(RoleUser roleUser);
	
	RoleUser findRoleById(Long idRole);
	
	void updateRole(RoleUser role);
	
	void deleteRoleById(Long idRole);
	
	
}
