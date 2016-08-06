package com.peak.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.peak.controller.PeakController;
import com.peak.domain.PeakCustomerInfo;
import com.peak.service.PeakService;
import com.peak.validator.PeakValidator;

@Controller
@RequestMapping("/peak")
public class PeakController {
	
	@Autowired
	private PeakService peakService;
	
	Logger logger = Logger.getLogger(PeakController.class);
	
//	@InitBinder
//	protected void initBinder(WebDataBinder webDataBinder){
//		webDataBinder.setValidator(new PeakValidator());
//	}
	
	@ModelAttribute
	public PeakCustomerInfo construct() {
		return new PeakCustomerInfo();
	}
	
//	This mapping: http://localhost:8080/peak/showCustomerInfo
//	1. Query the database 
//	2. Return all results in JSON
	@RequestMapping(value="/showCustomers", method = RequestMethod.GET) //, produces = "application/json"
	public  @ResponseBody List<PeakCustomerInfo> showUsers(Model model){
		List<PeakCustomerInfo> rs = this.peakService.findAll();
		if(rs.isEmpty()){
			logger.error(String.format("*** Controller: PeakController - Return Value from PeakService returned: rs = ", rs.size()));
		}
		System.out.println("rs = "+rs);
		return rs;
	}
	
//	first, we should create a method
//	that return .jsp file
//	and then inside the jsp file
//	it'll call ajax
//	to get the list of data
	@RequestMapping(value="/customerInfo", method = RequestMethod.GET)
	public String ShowpeakCustomerInfoJSP(Model model) {
		return "peakCustomerInfo";
	}
	
    @RequestMapping
	public String showRegisterPage(Model model) {  
//    	model.addAttribute("criteria", registrationService.findAll());
    	model.addAttribute("PeakCustomerInfo", new PeakCustomerInfo());
	    return "register";
	}

}
