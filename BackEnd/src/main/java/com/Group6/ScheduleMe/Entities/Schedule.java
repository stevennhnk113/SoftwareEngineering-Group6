package com.Group6.ScheduleMe.Entities;

import java.util.Date;

public class Schedule {
	
private Date StartTime;

private Date EndTime;

private String ScheduleDetail;

private String ScheduleType;

private long ScheduleFor;

private long ScheduleBy;

private long ScheduleSeriesid;

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




}
