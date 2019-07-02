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

import com.Group6.ScheduleMe.Entities.EventSeries;
import com.Group6.ScheduleMe.Entities.Schedule;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.ScheduleSeriesRepository;


public class ScheduleSeriesController {

	
ScheduleSeriesRepository scheduleseriesRepository;
    
    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @GetMapping("/sceduleseries")
    public List<EventSeries> getAllScheduleseries() {
        return scheduleseriesRepository.findAll();
}
 // Create a new Schedule
    @PostMapping("/scheduleseries")
    public EventSeries createSchedule(@Valid @RequestBody EventSeries eventSeries) {
        EventSeries savedScheduleSeries = scheduleseriesRepository.save(eventSeries);
        return savedScheduleSeries;
    }
    
    // Get a Single Schedule
    @GetMapping("/scheduleseries/{id}")
    public EventSeries getUserById(@PathVariable(value = "id") Long scheduleseriesId) {
        return scheduleseriesRepository.findById(scheduleseriesId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", scheduleseriesId));
    }
    
    // Update a Note
    @PutMapping("/scheduleseries/{id}")
    public EventSeries updateSchedule(@PathVariable(value = "id") Long scheduleseriesId,
                                            @Valid @RequestBody EventSeries scheduleDetails) {

    	EventSeries scheduleSeries = scheduleseriesRepository.findById(scheduleseriesId)
                .orElseThrow(() -> new ResourceNotFoundException("ScheduleSeries", "id", scheduleseriesId));

    	scheduleSeries.setRepeatEvery(scheduleDetails.getRepeatEvery());
    	scheduleSeries.setRepeatWeekly(scheduleDetails.getRepeatWeekly());
    
    	EventSeries updatedScheduleSeries = scheduleseriesRepository.save(scheduleSeries);
        return updatedScheduleSeries;
    }
    
    // Delete a Schedule
    @DeleteMapping("/scheduleseries/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long scheduleseriesId) {
        EventSeries scheduleseries = scheduleseriesRepository.findById(scheduleseriesId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", scheduleseriesId));

        scheduleseriesRepository.delete(scheduleseries);

        return ResponseEntity.ok().build();
    }
    
    // Delete  Schedule
    @DeleteMapping("/scheduleseries")
    public ResponseEntity<?> deleteAllSchedules() {
        scheduleseriesRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
	
	
}
