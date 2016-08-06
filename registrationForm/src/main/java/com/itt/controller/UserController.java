package com.itt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/user")
public class UserController {
	
	@RequestMapping
	public String home(){
		return "user";
	}
	
//	@Autowired
//	private UserService userService;
//	
//	@RequestMapping("/users")
//	public ModelAndView users(ModelMap Model){
//		
//		List<user> 1stUser = userService.findAll();
//		
//		ModelAndView result = new ModelAndView("users");
//		result.addObject("users", 1stUsers);
//		
//		return result;
//	}

}
