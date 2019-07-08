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

import com.Group6.ScheduleMe.Entities.Schedule;
import com.Group6.ScheduleMe.Entities.ScheduleSeries;
import com.Group6.ScheduleMe.Exception.ResourceNotFoundException;
import com.Group6.ScheduleMe.Repository.ScheduleRepository;
import com.Group6.ScheduleMe.Repository.ScheduleSeriesRepository;

@RestController
@RequestMapping("/api")
public class ScheduleController {

	@Autowired
	ScheduleRepository scheduleRepository;

	@Autowired
	ScheduleSeriesRepository scheduleSeriesRepository;

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping("/schedules")
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}

	// Create a new Schedule
	@PostMapping("/schedule")
	public Schedule createSchedule(@RequestBody Schedule schedule) {
		ScheduleSeries savedScheduleSeries = null;
		if (schedule.getScheduleSeries() != null) {
			savedScheduleSeries = scheduleSeriesRepository.save(schedule.getScheduleSeries());
		}

		if (savedScheduleSeries != null) {
			schedule.setScheduleSeriesid(savedScheduleSeries.getId());
		}
		Schedule savedSchedule = scheduleRepository.save(schedule);
		return savedSchedule;
	}

	// Get a Single Schedule by id
	@GetMapping("/schedule/{id}")
	public Schedule getScheduleById(@PathVariable(value = "id") Long id) {
		return scheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", id));
	}

	// Get a Single Schedule
	@GetMapping("/schedule/type/{ScheduleType}")
	public Schedule getScheduleByType(@PathVariable(value = "ScheduleType") String scheduleType) {
		return scheduleRepository.findByScheduleType(scheduleType)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "ScheduleType", scheduleType));
	}

	// Update a Note
	@PutMapping("/schedule/{ScheduleType}")
	public Schedule updateSchedule(@PathVariable(value = "ScheduleType") String scheduleType,
			@Valid @RequestBody Schedule scheduleDetails) {

		Schedule schedule = scheduleRepository.findByScheduleType(scheduleType)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "ScheduleType", scheduleType));

		schedule.setStartTime(scheduleDetails.getStartTime());
		schedule.setEndTime(scheduleDetails.getEndTime());
		schedule.setScheduleFor(scheduleDetails.getScheduleFor());
		schedule.setScheduleBy(scheduleDetails.getScheduleBy());
		Schedule updatedSchedule = scheduleRepository.save(schedule);
		return updatedSchedule;
	}

	// Delete a Schedule
	@DeleteMapping("/schedule/{id}")
	public ResponseEntity<?> deleteSchedule(@PathVariable(value = "id") Long id) {
		Schedule schedule = scheduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", id));

		scheduleRepository.delete(schedule);

		return ResponseEntity.ok().build();
	}

	// Delete Schedule
	@DeleteMapping("/schedules")
	public ResponseEntity<?> deleteAllSchedules() {
		scheduleRepository.deleteAll();
		return ResponseEntity.ok().build();
	}
}
