package com.Group6.ScheduleMe.Controller;

import com.Group6.ScheduleMe.Entities.LoginForm;
import com.Group6.ScheduleMe.Entities.User;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
	
    @Autowired
    UserRepository userRepository;
    
    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping("/hello")
    public String getHello() {
    	return "hello";
    }
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
//    @PostMapping("/hello1")
//    @RequestMapping(value = "/hello1", method = RequestMethod.POST)
//    public String getHello1(@RequestBody User user) {
//    	return "hello1";
//    }
    
    // Create a new User
    @PostMapping("/user")
    public User createUser(@Valid @RequestBody User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }
    
    // Get a Single User
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable(value = "id") Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
    
    // Update a Note
    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable(value = "id") Long userId,
                                            @Valid @RequestBody User userDetails) {

    	User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

    	user.setFirstName(userDetails.getFirstName());
    	user.setLastName(userDetails.getLastName());
    	user.setPosition(userDetails.getPosition());

    	User updatedUser = userRepository.save(user);
        return updatedUser;
    }
    
    // Delete a User
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        userRepository.delete(user);

        return ResponseEntity.ok().build();
    }
    
    // Delete a User
    @DeleteMapping("/users")
    public ResponseEntity<?> deleteAllUsers() {
        userRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/user/login")
    public User loginUser(@RequestBody LoginForm loginForm ) {
    	// Get all the user
    	// userRepository.findAll()
    	//Find the user with that user name
    	User user = userRepository.findByUsername(loginForm.getUsername())
    			.orElseThrow(() -> new ResourceNotFoundException("User", "username", loginForm.getUsername()));
    	
    	
    	
    		
     	//Then check if the password match
    	// if match, return true with the user information
<<<<<<< HEAD
    	if (loginForm.getPassword().equals("Password"))
=======
    	if (loginForm.getPassword().equals(user.getPassword()))
>>>>>>> 1ec5e89e95c61691c2cb3e8bce7f926586f4aa60
    	{
    		return user;
    	}
    	else
    	{
    		return null;
    	}
    	// If not match, return false with null
    	
    	
    
    }
}
