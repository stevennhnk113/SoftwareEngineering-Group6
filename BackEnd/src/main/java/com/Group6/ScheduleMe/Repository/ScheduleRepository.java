package com.Group6.ScheduleMe.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Group6.ScheduleMe.Entities.Schedule;


public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
	
	@Query(value = "SELECT s FROM Scedule s WHERE s.ScheduleType = ?1", nativeQuery = false)
	Optional<Schedule> findByUsername(String ScheduleType);
}