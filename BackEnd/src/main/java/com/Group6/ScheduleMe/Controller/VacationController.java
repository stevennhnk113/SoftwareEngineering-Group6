package com.Group6.ScheduleMe.Controller;

import com.Group6.ScheduleMe.Entities.LoginForm;
import com.Group6.ScheduleMe.Entities.User;
import com.Group6.ScheduleMe.Entities.Vacation;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.VacationRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VacationController {
	
    @Autowired
    VacationRepository vacationRepository;
    
    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    // Create a new Vacation
    @CrossOrigin
    @PostMapping("/user/schedule")
    public Vacation createUser(@Valid @RequestBody Vacation vacation) {
        Vacation savedVacation = vacationRepository.save(vacation);
        return savedVacation;
    }
    
    // Get all vacation of a user
    @CrossOrigin
    @GetMapping("/user/{id}/vacations")
    public List<Vacation> getSchedulesByUserID(@PathVariable(value = "id") Long userId) {
        return vacationRepository.findByScheduledFor(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Vacation", "id", userId));
    }
    
    // Get a single vacation
    @CrossOrigin
    @GetMapping("/user/vacation/{id}")
    public Vacation getScheduleByID(@PathVariable(value = "id") Long vacationId) {
    	// Return list of Position

    	return vacationRepository.findById(vacationId)
    			.orElseThrow(() -> new ResourceNotFoundException("Vacation", "id", vacationId));
    }
    
    // Update a vacation
    @CrossOrigin
    @PutMapping("/user/vacation/{id}")
    public Vacation updateVacation(@PathVariable(value = "id") Long vacationId,
                                            @Valid @RequestBody Vacation vacationDetails) {

    	Vacation vacation = vacationRepository.findById(vacationId)
                .orElseThrow(() -> new ResourceNotFoundException("Vacation", "id", vacationId));

    	vacation.setStartTime(vacationDetails.getStartTime());
    	vacation.setEndTime(vacationDetails.getEndTime());

    	Vacation updatedVacation = vacationRepository.save(vacation);
        return updatedVacation;
    }
    
    // Delete a vacation
    @CrossOrigin
    @DeleteMapping("/user/vacation/{id}")
    public ResponseEntity<?> deleteVacation(@PathVariable(value = "id") Long vacationId) {
        Vacation vacation = vacationRepository.findById(vacationId)
                .orElseThrow(() -> new ResourceNotFoundException("Vacation", "id", vacationId));

        vacationRepository.delete(vacation);

        return ResponseEntity.ok().build();
    }
}
