package com.Group6.ScheduleMe.Controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Group6.ScheduleMe.Entities.ScheduleForm;
import com.Group6.ScheduleMe.Entities.ScheduleSeries;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.ScheduleSeriesRepository;

@RestController
@RequestMapping("/api")
public class ScheduleSeriesController {

	@Autowired
	ScheduleSeriesRepository scheduleseriesRepository;

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping("/sceduleseriess")
	public List<ScheduleSeries> getAllScheduleSeries() {
		return scheduleseriesRepository.findAll();
	}

	// Create a new Schedule
	@PostMapping("/scheduleseries")
	public ScheduleSeries createSchedule(@Valid @RequestBody ScheduleSeries eventSeries) {
		ScheduleSeries savedScheduleSeries = scheduleseriesRepository.save(eventSeries);
		return savedScheduleSeries;
	}

	// Get a Single Schedule
	@GetMapping("/scheduleseries/{id}")
	public ScheduleSeries getUserById(@PathVariable(value = "id") Long scheduleseriesId) {
		return scheduleseriesRepository.findById(scheduleseriesId)
				.orElseThrow(() -> new ResourceNotFoundException("ScheduleSeries", "id", scheduleseriesId));
	}

	// Update a Note
	@PutMapping("/scheduleseries/{id}")
	public ScheduleSeries updateSchedule(@PathVariable(value = "id") Long scheduleseriesId,
			@Valid @RequestBody ScheduleSeries scheduleDetails) {

		ScheduleSeries scheduleSeries = scheduleseriesRepository.findById(scheduleseriesId)
				.orElseThrow(() -> new ResourceNotFoundException("ScheduleSeries", "id", scheduleseriesId));

		scheduleSeries.setRepeatEvery(scheduleDetails.getRepeatEvery());
		scheduleSeries.setRepeatWeekly(scheduleDetails.getRepeatWeekly());

		ScheduleSeries updatedScheduleSeries = scheduleseriesRepository.save(scheduleSeries);
		return updatedScheduleSeries;
	}

	// Delete a Schedule
	@DeleteMapping("/scheduleseries/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long scheduleseriesId) {
		ScheduleSeries scheduleseries = scheduleseriesRepository.findById(scheduleseriesId)
				.orElseThrow(() -> new ResourceNotFoundException("ScheduleSeries", "id", scheduleseriesId));

		scheduleseriesRepository.delete(scheduleseries);

		return ResponseEntity.ok().build();
	}

	// Delete Schedule
	@DeleteMapping("/scheduleseries")
	public ResponseEntity<?> deleteAllSchedules() {
		scheduleseriesRepository.deleteAll();
		return ResponseEntity.ok().build();
	}

	@PostMapping("/scheduleseries/scheduleform")
	public ScheduleSeries scheduleRepo(@RequestBody ScheduleForm schedForm) {

		ScheduleSeries scheduleseries = scheduleseriesRepository.findById(schedForm.getScheduleSeriesid())
				.orElseThrow(() -> new ResourceNotFoundException("ScheduleSeries", "ScheduleSeriesid",
						schedForm.getScheduleSeriesid()));

		return null;
	}
}
