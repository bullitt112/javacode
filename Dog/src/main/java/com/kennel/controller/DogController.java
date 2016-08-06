package com.kennel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kennel.domain.Dog;
import com.kennel.service.DogService;

@Controller
@RequestMapping("/dog")
public class DogController {

    @Autowired
    private DogService dogService;
    
    @ModelAttribute
    public Dog construct() {
        return new Dog();
    }
    
    @RequestMapping
    public String showRegisterPage(Model model) {  
        model.addAttribute("Dog", new Dog());
        return "dog";
    }
    
    //getDog
//    @RequestMapping(value = "/getDog", method=RequestMethod.GET, produces = "application/json")
//    public  @ResponseBody String getDog(Model model) {
//        model.addAttribute("dog", dogService.getDog());
//        return "dog";
//        
//    }
    
    @RequestMapping(value = "/getDog", method=RequestMethod.GET, produces = "application/json")
            public ModelAndView getDog() {
                    ModelAndView mav = new ModelAndView();
                    Dog dog = new Dog();
                    dog = DogService.getDog();    
                    mav.setViewName("dog");
                    mav.addObject("dog", dog);
                    String color = dog.getColor();
                    System.out.println("color = "+color);
                    return mav;
            }

    
        }

