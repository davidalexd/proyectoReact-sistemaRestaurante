package com.restaurant.api.controllers.rest;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.restaurant.api.dto.response.RoleRequest;
import com.restaurant.api.models.User;
import com.restaurant.api.repositories.RoleRepository;
import com.restaurant.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.restaurant.api.models.RoleUser;
import com.restaurant.api.dto.response.MessageResponse;
import com.restaurant.api.service.RoleUserService;

@RestController
@RequestMapping(value = "/api/roles")
@CrossOrigin
public class RoleUserController {

	@Autowired 
	private RoleUserService _rolesUserService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;


	@GetMapping("/")
	public ResponseEntity<?> getRoles(){
		List<RoleUser> roles = _rolesUserService.findAllRoles();
		if(roles.isEmpty() || roles == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<RoleUser>>(roles,HttpStatus.OK);
	}
	@PostMapping("/")
	public ResponseEntity<?> saveRoles(@RequestBody RoleUser roleUser,UriComponentsBuilder uriComponentsBuilder){
		if(roleUser == null) {
			return new ResponseEntity<>(new MessageResponse("Provide a role"), HttpStatus.NO_CONTENT);
		}
		if(roleUser.getNameRole().isEmpty() || roleUser.getNameRole() == null) {
			return new ResponseEntity<>(new MessageResponse("Provide a role name "),HttpStatus.BAD_REQUEST);
		}
		_rolesUserService.saveRoleUser(roleUser);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@PostMapping("/users/{id}")
	public ResponseEntity<?> updateRoles(@PathVariable("id")Long id, @RequestBody RoleRequest roleRequest){
		Optional<User> userOpt =userRepository.findById(id);
		if(!userOpt.isPresent()){
			return ResponseEntity.badRequest().body(new MessageResponse("User not FOUND"));
		}
		User user = userOpt.get();
		Set<RoleUser> roles = user.getRoles();
		roles.clear();
		switch (roleRequest.getRole()) {
			case "admin":
				RoleUser adminRole = roleRepository.findByNameRole("ROLE_ADMIN")
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(adminRole);

				break;
			case "mod":
				RoleUser modRole = roleRepository.findByNameRole("ROLE_MODERATOR")
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(modRole);

				break;
			default:
				RoleUser userRole = roleRepository.findByNameRole("ROLE_USER")
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(userRole);
		}
		user.setRoles(roles);
		Timestamp ts = Timestamp.from(Instant.now());
		user.setUpdatedAt(ts);
		User userSaved = userRepository.save(user);
		return ResponseEntity.ok().body(userSaved);
	}

	
}
