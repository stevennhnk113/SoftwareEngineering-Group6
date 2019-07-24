package com.Group6.ScheduleMe;

import static org.junit.Assert.fail;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.Group6.ScheduleMe.Entities.LoginForm;
import com.Group6.ScheduleMe.Entities.Schedule;
import com.Group6.ScheduleMe.Entities.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ScheduleControllerTest {

	private String TestScheduleDetail = "Schedule Detail";
	private String TestScheduleType = "Schedule Type";
	private long TestScheduleFor = 1;
	private long TestScheduleBy = 2;

	@Before
	public void setUp() throws Exception {

	}

	public long CreateATestSchedule() {
		try {
			Schedule testSchedule = new Schedule();
			testSchedule.setStartTime(new Date());
			testSchedule.setEndTime(new Date());
			testSchedule.setScheduleDetail(TestScheduleDetail);
			testSchedule.setScheduleType(TestScheduleType);
			testSchedule.setScheduleFor(TestScheduleFor);
			testSchedule.setScheduleBy(TestScheduleBy);

			ObjectMapper Obj = new ObjectMapper();
			String jsonStr = Obj.writeValueAsString(testSchedule);

			OkHttpClient client = new OkHttpClient();

			MediaType mediaType = MediaType.parse("application/json");
			RequestBody body = RequestBody.create(mediaType, jsonStr);
			Request request = new Request.Builder().url("http://localhost:8000/api/schedule").post(body).build();

			Response response = client.newCall(request).execute();
			Schedule schedule = new ObjectMapper().readValue(response.body().string(), Schedule.class);
			return schedule.getId();

		} catch (Exception e) {
			return -1;
		}
	}

	public void DeleteATestSchedule(long id) {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedule/" + String.valueOf(id))
					.delete(null).build();

			Response response = client.newCall(request).execute();
		} catch (Exception e) {
			fail("Fail to make request");
		}
	}

	public Schedule GetATestSchedule(long id) {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedule/" + String.valueOf(id)).get()
					.build();

			Response response = client.newCall(request).execute();
			Schedule schedule = new ObjectMapper().readValue(response.body().string(), Schedule.class);
			return schedule;
		} catch (Exception e) {
			return null;
		}
	}

	@Test
	public void GetAllSchedulesTest() {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedules").get().build();

			Response response = client.newCall(request).execute();

			List<Schedule> schedule = new ObjectMapper().readValue(response.body().string(), new TypeReference<List<Schedule>>() {
			});

			boolean result = (schedule.size() > 0);
			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		}
	}

	@Test
	public void CreateAndGetUserTest() {
		long testScheduleID = -1;
		try {
			// Create user
			testScheduleID = this.CreateATestSchedule();

			if (testScheduleID == -1) {
				fail("Fail to make request");
			}

			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedule/" + String.valueOf(testScheduleID))
					.get().build();

			Response response = client.newCall(request).execute();

			// Check if user is created
			Schedule schedule = new ObjectMapper().readValue(response.body().string(), Schedule.class);
			boolean result = (schedule.getScheduleDetail().compareTo(this.TestScheduleDetail) == 0
					&& schedule.getScheduleType().compareTo(this.TestScheduleType) == 0
					&& schedule.getScheduleFor() == this.TestScheduleFor
					&& schedule.getScheduleBy() == this.TestScheduleBy);

			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testScheduleID != -1) {
				this.DeleteATestSchedule(testScheduleID);
			}
		}
	}

	@Test
	public void DeleteUserTest() {
		long testScheduleID = -1;
		try {
			// Create user
			testScheduleID = this.CreateATestSchedule();

			if (testScheduleID == -1) {
				fail("Fail to make request");
			}

			// Check if user is created
			Schedule schedule = this.GetATestSchedule(testScheduleID);
			if (schedule == null) {
				Assert.assertTrue(false);
			}

			this.DeleteATestSchedule(testScheduleID);
			Schedule deletedSchedule = this.GetATestSchedule(testScheduleID);

			boolean result = (deletedSchedule == null);
			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testScheduleID != -1) {
				this.DeleteATestSchedule(testScheduleID);
			}
		}
	}
	
	@Test
	public void GetScheduleByTypeTest() {
		long testScheduleID = -1;
		try {
			// Create user
			testScheduleID = this.CreateATestSchedule();

			if (testScheduleID == -1) {
				fail("Fail to make request");
			}

			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedule/type/" + this.TestScheduleType)
					.get().build();

			Response response = client.newCall(request).execute();

			// Check if user is created
			Schedule schedule = new ObjectMapper().readValue(response.body().string(), Schedule.class);
			boolean result = (schedule.getScheduleDetail().compareTo(this.TestScheduleDetail) == 0
					&& schedule.getScheduleType().compareTo(this.TestScheduleType) == 0
					&& schedule.getScheduleFor() == this.TestScheduleFor
					&& schedule.getScheduleBy() == this.TestScheduleBy);

			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testScheduleID != -1) {
				this.DeleteATestSchedule(testScheduleID);
			}
		}
	}
	
	@Test
	public void GetScheduleByScheduleForTest() {
		long testScheduleID = -1;
		try {
			// Create user
			testScheduleID = this.CreateATestSchedule();

			if (testScheduleID == -1) {
				fail("Fail to make request");
			}

			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/schedule/schedulefor/" + String.valueOf(TestScheduleFor))
					.get().build();

			Response response = client.newCall(request).execute();

			// Check if user is created
			List<Schedule> schedule = new ObjectMapper().readValue(response.body().string(), new TypeReference<List<Schedule>>() {
			});
			boolean result = true;
			for(int i = 0; i < schedule.size(); i++) {
				if(schedule.get(i).getScheduleFor() != this.TestScheduleFor) {
					result = false;
				}
			}

			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testScheduleID != -1) {
				this.DeleteATestSchedule(testScheduleID);
			}
		}
	}
}