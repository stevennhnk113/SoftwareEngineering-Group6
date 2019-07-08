package com.Group6.ScheduleMe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Group6.ScheduleMe.Entities.ScheduleSeries;

@Repository
public interface ScheduleSeriesRepository extends JpaRepository<ScheduleSeries, Long> {

}