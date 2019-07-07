package com.Group6.ScheduleMe.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Group6.ScheduleMe.Entities.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, String>{
	
	@Query(value = "SELECT s FROM Schedule s WHERE s.ScheduleType = ?1", nativeQuery = false)
	Optional<Schedule> findByScheduleType(String ScheduleType);
}