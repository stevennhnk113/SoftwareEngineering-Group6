package com.Group6.ScheduleMe.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.Group6.ScheduleMe.Entities.EventSeries;


public interface ScheduleSeriesRepository extends JpaRepository<EventSeries, Long>{
	
	@Query(value = "SELECT s1 FROM EventSeries s1 WHERE s1.id = ?1", nativeQuery = false)
	Optional<EventSeries> findByUsername(String ScheduleType);
}