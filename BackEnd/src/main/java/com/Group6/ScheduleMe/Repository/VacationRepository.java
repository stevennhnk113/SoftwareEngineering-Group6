package com.Group6.ScheduleMe.Repository;

import com.Group6.ScheduleMe.Entities.Vacation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long>{
	
	@Query(value = "SELECT u FROM Vacation u WHERE u.ScheduledFor = ?1", nativeQuery = false)
	Optional<List<Vacation>> findByScheduledFor(Long id);
}
