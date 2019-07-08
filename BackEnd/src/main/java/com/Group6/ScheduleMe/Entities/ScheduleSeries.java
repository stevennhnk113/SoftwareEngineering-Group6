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
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "scheduleseries")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
public class ScheduleSeries {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, updatable = false)
	@JsonProperty("id")
	private long id;

	@NotBlank
	private String RepeatEvery;

	@NotBlank
	private String RepeatWeekly;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public String getRepeatEvery() {
		return RepeatEvery;
	}

	public long getId() {
		return id;
	}

	public void setRepeatEvery(String repeatEvery) {
		RepeatEvery = repeatEvery;
	}

	public String getRepeatWeekly() {
		return RepeatWeekly;
	}

	public void setRepeatWeekly(String repeatWeekly) {
		RepeatWeekly = repeatWeekly;
	}

}
