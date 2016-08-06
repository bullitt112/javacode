package com.peak;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.peak.app.Peak5AdvisorsApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Peak5AdvisorsApplication.class)
@WebAppConfiguration
public class Peak5AdvisorsApplicationTests {

	@Test
	public void contextLoads() {
	}

}
