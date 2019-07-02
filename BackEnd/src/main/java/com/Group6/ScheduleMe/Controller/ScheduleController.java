package com.Group6.ScheduleMe.Controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.Group6.ScheduleMe.Entities.Schedule;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.ScheduleRepository;

public class ScheduleController {

	
    ScheduleRepository scheduleRepository;
    
    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @GetMapping("/scedules")
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
}
 // Create a new Schedule
    @PostMapping("/schedule")
    public Schedule createSchedule(@Valid @RequestBody Schedule schedule) {
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule;
    }
    
    // Get a Single Schedule
    @GetMapping("/schedule/{id}")
    public Schedule getUserById(@PathVariable(value = "id") Long scheduleId) {
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", scheduleId));
    }
    
    // Update a Note
    @PutMapping("/schedule/{id}")
    public Schedule updateSchedule(@PathVariable(value = "id") Long scheduleId,
                                            @Valid @RequestBody Schedule scheduleDetails) {

    	Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", scheduleId));

    	schedule.setStartTime(scheduleDetails.getStartTime());
    	schedule.setEndTime(scheduleDetails.getEndTime());
    
    	Schedule updatedSchedule = scheduleRepository.save(schedule);
        return updatedSchedule;
    }
    
    // Delete a Schedule
    @DeleteMapping("/schedule/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", scheduleId));

        scheduleRepository.delete(schedule);

        return ResponseEntity.ok().build();
    }
    
    // Delete  Schedule
    @DeleteMapping("/schedules")
    public ResponseEntity<?> deleteAllSchedules() {
        scheduleRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
    
}

