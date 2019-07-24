package com.Group6.ScheduleMe;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.Group6.ScheduleMe.Entities.User;

public class UserEntityTest {

	

	@Before
	public void setUp() throws Exception {
	}

	
	@Test
	public void setFirstNameTest()  {
		User user = new User();
		user.setFirstName("John");
		assertEquals(user.getFirstName(),"John");
		
	}

	@Test
	public void getFirstNameTest()  {
		User user = new User();
		user.setFirstName("John");
		assertEquals("John",user.getFirstName());
		
	}
	
	@Test
	public void setLastNameTest()  {
		User user = new User();
		user.setLastName("John");
		assertEquals(user.getLastName(),"John");
		
	}

	@Test
	public void getLastNameTest()  {
		User user = new User();
		user.setLastName("John");
		assertEquals("John",user.getLastName());
		
	}
	
	@Test
	public void setUserNameTest()  {
		User user = new User();
		user.setUserName("John123");
		assertEquals(user.getUserName(),"John123");
		
	}

	@Test
	public void getUserNameeTest()  {
		User user = new User();
		user.setUserName("John123");
		assertEquals("John123",user.getUserName());
		
	}
	
	 
}
