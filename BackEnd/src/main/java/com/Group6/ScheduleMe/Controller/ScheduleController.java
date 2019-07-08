package com.Group6.ScheduleMe.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	@CrossOrigin
	@GetMapping("/schedules")
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}

	// Create a new Schedule
	@CrossOrigin
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
	@CrossOrigin
	@GetMapping("/schedule/{id}")
	public Schedule getScheduleById(@PathVariable(value = "id") Long id) {
		return scheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", id));
	}

	@CrossOrigin
	@GetMapping("/schedule/schedulefor/{id}")
	public List<Schedule> getScheduleByScheduleFor(@PathVariable(value = "id") Long id) {
		return scheduleRepository.findByScheduleFor(id)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", id));
	}

	// Get a Single Schedule
	@CrossOrigin
	@GetMapping("/schedule/type/{ScheduleType}")
	public Schedule getScheduleByType(@PathVariable(value = "ScheduleType") String scheduleType) {
		return scheduleRepository.findByScheduleType(scheduleType)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "ScheduleType", scheduleType));
	}

	// Update a Note
	@CrossOrigin
	@PutMapping("/schedule")
	public Schedule updateSchedule(@RequestBody Schedule schedule) {

		Schedule currentSchedule = scheduleRepository.findById(schedule.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "Update Schedule", schedule.getId()));

		if (schedule.getScheduleSeries() != null) {
			ScheduleSeries newScheduleSeries = scheduleSeriesRepository.save(schedule.getScheduleSeries());
			currentSchedule.setScheduleSeriesid(newScheduleSeries.getId());
			currentSchedule.setScheduleSeries(newScheduleSeries);
		} else {
			if (currentSchedule.getScheduleSeries() != null) {
				scheduleSeriesRepository.deleteById(currentSchedule.getScheduleSeriesid());
				currentSchedule.setScheduleSeriesid(0);
				currentSchedule.setScheduleSeries(null);
			}
		}

		currentSchedule.setStartTime(schedule.getStartTime());
		currentSchedule.setEndTime(schedule.getEndTime());
		currentSchedule.setScheduleFor(schedule.getScheduleFor());
		currentSchedule.setScheduleBy(schedule.getScheduleBy());
		Schedule updatedSchedule = scheduleRepository.save(currentSchedule);

		return updatedSchedule;
	}

	// Delete a Schedule
	@CrossOrigin
	@DeleteMapping("/schedule/{id}")
	public ResponseEntity<?> deleteSchedule(@PathVariable(value = "id") Long id) {
		Schedule schedule = scheduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Schedule", "id", id));

		scheduleRepository.delete(schedule);

		return ResponseEntity.ok().build();
	}

	// Delete Schedule
	@CrossOrigin
	@DeleteMapping("/schedules")
	public ResponseEntity<?> deleteAllSchedules() {
		scheduleRepository.deleteAll();
		return ResponseEntity.ok().build();
	}
}
