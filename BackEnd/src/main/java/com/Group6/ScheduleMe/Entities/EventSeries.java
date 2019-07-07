package com.Group6.ScheduleMe.Entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
@Table(name = "scheduleseries" )
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, 
        allowGetters = true)
public class EventSeries {

	  @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "id", nullable = false, updatable = false)
	    @JsonProperty("id")
	private long id;
	
	  @OneToOne
	    @JoinColumn(name ="FK_ScheduleSeriesid")
	  private Schedule schedule;
	  
	  @NotBlank
	private String RepeatEvery ="weekly";
	@NotBlank
	private String RepeatWeekly = "Sun";


@Column(nullable = false, updatable = false)
@Temporal(TemporalType.TIMESTAMP)
@CreatedDate
private Date createdAt;

@Column(nullable = false)
@Temporal(TemporalType.TIMESTAMP)
@LastModifiedDate
private Date updatedAt;

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public String getRepeatEvery() {
	return RepeatEvery;
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
