package com.Group6.ScheduleMe.Entities;

public class EventSeries {

	private long id;
	
	private String RepeatEvery;
	
	private String RepeatWeekly;

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
