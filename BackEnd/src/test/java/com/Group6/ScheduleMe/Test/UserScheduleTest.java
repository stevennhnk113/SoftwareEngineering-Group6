package com.Group6.ScheduleMe.Test;

//Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
public class UserScheduleTest {
private WebDriver driver;
private Map<String, Object> vars;
JavascriptExecutor js;
@Before
public void setUp() {
	 System.setProperty("webdriver.chrome.driver", "C:/temp/chromedriver.exe");
	    driver = new ChromeDriver();
 js = (JavascriptExecutor) driver;
 vars = new HashMap<String, Object>();
}
@After
public void tearDown() {
 driver.quit();
}
@Test
public void creatingaschedule() {
 driver.get("http://localhost:3000/");
 driver.manage().window().setSize(new Dimension(1518, 816));
 driver.findElement(By.name("Username")).click();
 driver.findElement(By.name("Username")).sendKeys("GoodShooter");
 driver.findElement(By.name("password")).sendKeys("123");
 driver.findElement(By.cssSelector(".btn-lg:nth-child(5)")).click();
 driver.findElement(By.cssSelector(".rbc-day-slot:nth-child(2) > .rbc-timeslot-group:nth-child(1) > .rbc-time-slot:nth-child(1)")).click();
 {
   List<WebElement> elements = driver.findElements(By.cssSelector(".rbc-day-slot:nth-child(2) .rbc-event"));
   assert(elements.size() > 0);
 }
 driver.findElement(By.cssSelector(".rbc-day-slot:nth-child(2) .rbc-event")).click();
 assertThat(driver.switchTo().alert().getText(), is("Do you want to delete this scheudule"));
 driver.switchTo().alert().accept();
 driver.close();
}
}

