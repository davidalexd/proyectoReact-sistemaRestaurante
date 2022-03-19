package com.restaurant.api.controllers.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.restaurant.api.dto.request.PasswordReset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.restaurant.api.models.RoleUser;
import com.restaurant.api.models.User;
import com.restaurant.api.dto.response.JwtResponse;
import com.restaurant.api.dto.request.LoginRequest;
import com.restaurant.api.dto.response.MessageResponse;
import com.restaurant.api.dto.request.SignupRequest;
import com.restaurant.api.repositories.RoleRepository;
import com.restaurant.api.repositories.UserRepository;
import com.restaurant.api.security.JwtUtils;
import com.restaurant.api.service.UserDetailsImpl;


@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRoles();
		Set<RoleUser> roles = new HashSet<>();
		
		
		if (strRoles.isEmpty()) {
			RoleUser userRole = roleRepository.findByNameRole("ROLE_USER")
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
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
				
			});
		}

		user.setRoles(roles);
		userRepository.save(user);
	

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/{id}/password")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordReset passwordReset, @PathVariable("id") Long id){
		Optional<User> userOpt = userRepository.findById(id);

		if(!userOpt.isPresent()){
			return ResponseEntity.badRequest().body(new MessageResponse("The user does NOT exist"));
		}
		User user = userOpt.get();
		String oldPassword = user.getPassword();
		if(!passwordReset.validateNewPassword()){
			return ResponseEntity.badRequest().body(new MessageResponse("The password do NOT match"));
		}
		String encodedPassword = encoder.encode(passwordReset.getOldPassword());
		boolean checkPassword = encoder.matches(passwordReset.getOldPassword(),oldPassword);
		if(checkPassword){
			user.setPassword(encoder.encode(passwordReset.getNewPassword()));
			userRepository.save(user);
			return ResponseEntity.ok().body(new MessageResponse("The password was updated successfully"));
		}else{
			return ResponseEntity.badRequest().body(new MessageResponse("The password is incorrect"));
		}
	}
}
