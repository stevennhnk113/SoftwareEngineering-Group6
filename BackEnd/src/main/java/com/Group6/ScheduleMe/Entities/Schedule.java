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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "schedules")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, 
        allowGetters = true)
public class Schedule {	
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    @JsonProperty("id")
    private long id;
    
//	@NotBlank
	private Date StartTime;

//	@NotBlank
private Date EndTime;

	
private String ScheduleDetail;

//@NotBlank
private String ScheduleType;

//@NotBlank
private long ScheduleFor;

//@NotBlank
private long ScheduleBy;

private long ScheduleSeriesid;

@Column(nullable = false, updatable = false)
@Temporal(TemporalType.TIMESTAMP)
@CreatedDate
private Date createdAt;

@Column(nullable = false)
@Temporal(TemporalType.TIMESTAMP)
@LastModifiedDate
private Date updatedAt;

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
