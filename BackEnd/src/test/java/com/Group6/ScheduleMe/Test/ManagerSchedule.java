package com.Group6.ScheduleMe.Test;

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
public class ManagerSchedule {
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
  public void managerSchedule() {
    driver.get("http://localhost:3000/");
    driver.manage().window().setSize(new Dimension(1050, 708));
    driver.findElement(By.name("Username")).click();
    driver.findElement(By.name("Username")).sendKeys("steve");
    driver.findElement(By.name("password")).click();
    driver.findElement(By.name("password")).sendKeys("33");
    driver.findElement(By.cssSelector(".btn-lg:nth-child(5)")).click();
   
    {
      WebElement element = driver.findElement(By.cssSelector(".rbc-now > .rbc-events-container"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".rbc-now > .rbc-events-container"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".rbc-now > .rbc-events-container"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
   
  }
}
