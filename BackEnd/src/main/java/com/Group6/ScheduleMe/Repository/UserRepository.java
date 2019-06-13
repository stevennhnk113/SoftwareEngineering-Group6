package com.Group6.ScheduleMe.Repository;

import com.Group6.ScheduleMe.Entities.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query(value = "SELECT u FROM User u WHERE u.UserName = ?1", nativeQuery = false)
	Optional<User> findByUsername(String username);
}
