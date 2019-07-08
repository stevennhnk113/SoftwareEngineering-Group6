package com.Group6.ScheduleMe.Entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "schedules")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, updatable = false)
	@JsonProperty("id")
	private Long id;

	@NotNull(message = "Please enter StartTime")
	private Date StartTime;

	@NotNull(message = "Please enter EndTime")
	private Date EndTime;

	private String ScheduleDetail;

	@NotBlank
	private String ScheduleType;

	@NotNull(message = "Please enter scheduleFor")
	@JsonProperty("scheduleFor")
	private long ScheduleFor;

	@NotNull(message = "Please enter scheduleBy")
	@JsonProperty("scheduleBy")
	private long ScheduleBy;

	private long ScheduleSeriesid;

	@Transient
	@JsonProperty("scheduleSeries")
	private ScheduleSeries ScheduleSeries;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public Long getId() {
		return id;
	}

	public Date getStartTime() {
		return StartTime;
	}

	public void setStartTime(Date startTime) {
		StartTime = startTime;
	}

	public Date getEndTime() {
		return EndTime;
	}

	public void setEndTime(Date endTime) {
		EndTime = endTime;
	}

	public ScheduleSeries getScheduleSeries() {
		return ScheduleSeries;
	}

	public void setScheduleSeries(ScheduleSeries scheduleSeries) {
		ScheduleSeries = scheduleSeries;
	}

	public String getScheduleDetail() {
		return ScheduleDetail;
	}

	public void setScheduleDetail(String scheduleDetail) {
		ScheduleDetail = scheduleDetail;
	}

	public String getScheduleType() {
		return ScheduleType;
	}

	public void setScheduleType(String scheduleType) {
		ScheduleType = scheduleType;
	}

	public long getScheduleFor() {
		return ScheduleFor;
	}

	public void setScheduleFor(long scheduleFor) {
		ScheduleFor = scheduleFor;
	}

	public long getScheduleBy() {
		return ScheduleBy;
	}

	public void setScheduleBy(long scheduleBy) {
		ScheduleBy = scheduleBy;
	}

	public long getScheduleSeriesid() {
		return ScheduleSeriesid;
	}

	public void setScheduleSeriesid(long scheduleSeriesid) {
		ScheduleSeriesid = scheduleSeriesid;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

}
