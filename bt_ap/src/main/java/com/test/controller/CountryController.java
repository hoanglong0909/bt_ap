package com.test.controller;


import com.test.model.Country;
import com.test.service.country.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/country")
public class CountryController {
    @Autowired
    private ICountryService countryService;

    @GetMapping
    public ModelAndView listCountry(){
        Iterable<Country> countries = countryService.findAll();
        ModelAndView modelAndView = new ModelAndView("/country/list");
        modelAndView.addObject("country",countries);
        return modelAndView;
    }


}
