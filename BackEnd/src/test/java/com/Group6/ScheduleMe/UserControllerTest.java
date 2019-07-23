package com.Group6.ScheduleMe;

import static org.junit.Assert.fail;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.Group6.ScheduleMe.Entities.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class UserControllerTest {

	private String TestUserName = "TestUser";
	private String TestFirstame = "Test user first name";
	private String TestLastName = "Test user last name";
	private String TestPosition = "Test user position";
	private String TestPassword = "Test user password";

	@Before
	public void setUp() throws Exception {

	}

	public long CreateATestUser() {
		try {
			User testUser = new User();
			testUser.setUserName(TestUserName);
			testUser.setFirstName(TestFirstame);
			testUser.setLastName(TestLastName);
			testUser.setPosition(TestPosition);
			testUser.setPassword(TestPassword);

			ObjectMapper Obj = new ObjectMapper();
			String jsonStr = Obj.writeValueAsString(testUser);

			OkHttpClient client = new OkHttpClient();

			MediaType mediaType = MediaType.parse("application/json");
			RequestBody body = RequestBody.create(mediaType, jsonStr);
			Request request = new Request.Builder().url("http://localhost:8000/api/user").post(body).build();

			Response response = client.newCall(request).execute();
			User user = new ObjectMapper().readValue(response.body().string(), User.class);
			return user.getId();

		} catch (Exception e) {
			return -1;
		}
	}

	public void DeleteATestUser(long id) {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/user/" + String.valueOf(id))
					.delete(null).build();

			Response response = client.newCall(request).execute();
		} catch (Exception e) {
			fail("Fail to make request");
		}
	}

	public User GetATestUser(long id) {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/user/" + String.valueOf(id)).get()
					.build();

			Response response = client.newCall(request).execute();
			User user = new ObjectMapper().readValue(response.body().string(), User.class);
			return user;
		} catch (Exception e) {
			return null;
		}
	}

	@Test
	public void GetAllUsersTest() {
		try {
			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/users").get().build();

			Response response = client.newCall(request).execute();

			List<User> users = new ObjectMapper().readValue(response.body().string(), new TypeReference<List<User>>() {
			});

			boolean result = (users.size() > 0);
			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		}
	}

	@Test
	public void CreateUserTest() {
		long testUserID = -1;
		try {
			// Create user
			testUserID = CreateATestUser();

			if (testUserID == -1) {
				fail("Fail to make request");
			}

			OkHttpClient client = new OkHttpClient();

			Request request = new Request.Builder().url("http://localhost:8000/api/user/" + String.valueOf(testUserID))
					.get().build();

			Response response = client.newCall(request).execute();

			// Check if user is created
			User user = new ObjectMapper().readValue(response.body().string(), User.class);
			boolean result = (user.getUserName().compareTo(TestUserName) == 0
					&& user.getLastName().compareTo(TestLastName) == 0
					&& user.getFirstName().compareTo(TestFirstame) == 0
					&& user.getPosition().compareTo(TestPosition) == 0
					&& user.getPassword().compareTo(TestPassword) == 0);

			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testUserID != -1) {
				DeleteATestUser(testUserID);
			}
		}
	}

	@Test
	public void DeleteUserTest() {
		long testUserID = -1;
		try {
			// Create user
			testUserID = CreateATestUser();

			if (testUserID == -1) {
				fail("Fail to make request");
			}

			// Check if user is created
			User user = GetATestUser(testUserID);
			if (user == null) {
				Assert.assertTrue(false);
			}

			DeleteATestUser(testUserID);
			User deletedUser = GetATestUser(testUserID);

			boolean result = (deletedUser == null);
			Assert.assertTrue(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			fail("Fail to make request");
		} finally {
			if (testUserID != -1) {
				DeleteATestUser(testUserID);
			}
		}
	}

}
