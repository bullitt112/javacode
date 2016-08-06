package com.itt.controller;

import java.util.UUID;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.UserService;

import com.itt.domain.User;
import com.itt.validator.RegistrationValidator;

@Controller
@RequestMapping("/register")
public class RegistrationController {
	@Autowired
	private UserService userService;
	Logger logger = Logger.getLogger(RegistrationController.class);

	@InitBinder
	protected void initBinder(WebDataBinder webDataBinder) {
		webDataBinder.setValidator(new RegistrationValidator());
	}

	@ModelAttribute
	public User construct() {
		return new User();
	}

	@RequestMapping
	public String showRegisterPage(Model model) {
		model.addAttribute("User", new User());
		return "register";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String processRegistrationRequest(
			@Valid @ModelAttribute("user") User user, BindingResult result) {
		logger.info("RegistrationController - processRegistrationRequest");
		final String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		// userService.setSecurityUUID(uuid);
		// user.setRegistrationConfirmed("pending");
		if (result.hasErrors()) {
			return "register";
		}
		userService.save(user);
		return "redirect:/register.html?success=true";
	}

	@RequestMapping(value = "/remove/{id}")
	public String removeUser(@PathVariable int id) {
		userService.delete(id);
		return "redirect:/users.html";
	}
	// @RequestMapping("/available")
	// @ResponseBody
	// public String available(@RequestParam String uid){
	// Boolean available = userService.findOne(uid) == null;
	// return available.toString();
	// }

	// @RequestMapping(method=RequestMethod.POST)
	// public ModelAndView doRegistration(@ModelAttribute("user") @Valid User
	// user, BindingResult bindingResult) {
	// if(bindingResult.hasErrors()) {
	// System.out.println("Form has errors");
	// List<ObjectError> errors = bindingResult.getAllErrors();
	//
	// for(ObjectError error: errors){
	// System.out.println(error);
	// }
	// return new ModelAndView("register");
	// }
	// return new ModelAndView("redirect:/register.html?success=true");
	// }
}