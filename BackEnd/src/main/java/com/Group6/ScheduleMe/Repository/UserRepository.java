package com.Group6.ScheduleMe.Repository;

import com.Group6.ScheduleMe.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
}
