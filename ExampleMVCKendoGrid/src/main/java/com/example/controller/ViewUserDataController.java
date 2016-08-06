package com.example.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.validation.ObjectError;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.bo.UserSearchCriteria;
import com.example.domain.User;
import com.example.service.ViewUserDataService;

@Controller
@RequestMapping(value = ViewUserDataController.url)
public class ViewUserDataController {
	public static final String url = "/staff/viewuserdata";
	
	private static final Logger logger = Logger.getLogger(ViewUserDataController.class);

	@Autowired
	private ViewUserDataService viewUserDataService;
	
	@RequestMapping(method = RequestMethod.GET)
	public String showPage(Model model) {
		model.addAttribute("criteria", new UserSearchCriteria());
		return "viewuserdata";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public @ResponseBody User getUser(
			@ModelAttribute("criteria") @Valid UserSearchCriteria criteria,
			BindingResult result, Model model, HttpServletRequest request,
			HttpServletResponse response) {

		User rs = new User();
		model.addAttribute("lastName", criteria.getLastName());
		String lastName = request.getParameter("lastName");
	
		//TODO ... findByLastName
		List<User> user = viewUserDataService.findAll();
		
		if (result.hasErrors()) {
			logger.debug("      Have validation errors "
					+ result.getFieldErrors());

			List<ObjectError> errors = result.getAllErrors();

			String message = "";
			for (ObjectError error : errors) {
				logger.debug("Error: = " + error.getDefaultMessage());
				message = error.getDefaultMessage();
			}
			model.addAttribute("uidError", message);
			return rs;
		}
		return rs;
	}
	
//	This mapping: http://localhost:8080/staff/viewuserdata/findAllUsers
//		1. Query the database 
//		2. Return all results in JSON
	@RequestMapping(value="/findAllUsers", method = RequestMethod.GET) //, produces = "application/json"
	public  @ResponseBody List<User> showAllUsers(Model model){
		List<User> rs = this.viewUserDataService.findAll();
		if(rs.isEmpty()){
			logger.error(String.format("*** Controller: ViewUserDataController - Return Value from viewUserDataService returned: rs = ", rs.size()));
		}
		System.out.println("rs = "+rs);
		return rs;
	}
	
//	first, we should create a method
//	that return .jsp file
//	and then inside the jsp file
//	it'll call ajax
//	to get the list of data
	@RequestMapping(value="/userdata", method = RequestMethod.GET)
	public String userdata(Model model) {
		return "userdata";
	}
	
//	This mapping: http://localhost:8080/staff/viewuserdata/showUsers
//	1. Query the database 
//	2. Return all results in JSON
	@RequestMapping(value="/showUsers", method = RequestMethod.GET) //, produces = "application/json"
	public  @ResponseBody List<User> showUsers(Model model){
		List<User> rs = this.viewUserDataService.findAll();
		if(rs.isEmpty()){
			logger.error(String.format("*** Controller: ViewUserDataController - Return Value from viewUserDataService returned: rs = ", rs.size()));
		}
		System.out.println("rs = "+rs);
		return rs;
	}
	
	@RequestMapping(value="/jtest", method = RequestMethod.GET) //, produces = "application/json"
	public   String showUsersTest(Model model){
		List<User> rs = this.viewUserDataService.findAll();
		if(rs.isEmpty()){
			logger.error(String.format("*** Controller: ViewUserDataController - Return Value from viewUserDataService returned: rs = ", rs.size()));
		}
		System.out.println("rs = "+rs);
		return "jTest";
	}
	
	@RequestMapping(value="/deleteUser", method = RequestMethod.POST)
	public  @ResponseBody User deleteUser(@RequestBody Map<String, Object> model) {
		User user = new User();
		//user.
		System.out.println("rs = "+user);
	//	user.saveOrUpdate(user)
		return user;
	}
	
	@RequestMapping(value="/editUser", method = RequestMethod.POST, headers="accept=*/*", produces = "application/json")
	public @ResponseBody User editUser(@RequestBody Map<String, Object> models) {
		User user = new User();
		Map val = models;
			
		user.setId((int) val.get("id"));
		user.setEmailAddress((String) val.get("emailAddress"));
		user.setFirstName((String) val.get("firstName"));
		user.setLastName((String) val.get("lastName"));
		user.setPassword((String) val.get("password"));
		user.setSecurityQuestion((String) val.get("securityQuestion"));

		return viewUserDataService.saveOrUpdate(user);
	}
}
