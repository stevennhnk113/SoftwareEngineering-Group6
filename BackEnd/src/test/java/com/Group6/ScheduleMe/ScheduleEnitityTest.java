package com.Group6.ScheduleMe;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.Group6.ScheduleMe.Entities.Schedule;
import com.Group6.ScheduleMe.Entities.User;

public class ScheduleEnitityTest {
	Date myDate = new Date(2019, 02, 11);

	@Before
	public void setUp() throws Exception {
	}

	
	@Test
	public void setScheduleDetailTest()  {
		Schedule schedule = new Schedule();
		schedule.setScheduleDetail("schedule is updated");
		assertEquals(schedule.getScheduleDetail(),"schedule is updated");
		
	}

	@Test
	public void getScheduleDetailTest()  {
		Schedule schedule = new Schedule();
		schedule.setScheduleDetail("schedule is updated");
		assertEquals("schedule is updated",schedule.getScheduleDetail());
		
		
	}
	
	@Test
	public void setScheduleTypeTest()  {
		Schedule schedule = new Schedule();
		schedule.setScheduleType("Manager");
		assertEquals(schedule.getScheduleType(),"Manager");
		
	}

	@Test
	public void getScheduleTypeTest()  {
		Schedule schedule = new Schedule();
		schedule.setScheduleType("Employee");
		assertEquals("Employee",schedule.getScheduleType());
		
		
	}
	@Test
	public void setStartTimeAtTest()  {
		Schedule schedule = new Schedule();
		schedule.setStartTime(myDate);
		assertEquals(schedule.getStartTime(),myDate);
		
	}
	

}
