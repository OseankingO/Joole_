package com.itilize.joole.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://joole-frontend.s3-website.us-east-2.amazonaws.com")
@RestController
@RequestMapping("")
public class HomeController {

    @GetMapping()
    public ModelAndView home() {
        ModelAndView mav = new ModelAndView("index");
        mav.addObject("message", "Hello My Project");
        return mav;
    }
}
