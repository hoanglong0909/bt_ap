package com.test.controller;


import com.test.model.Country;
import com.test.model.Province;
import com.test.service.country.ICountryService;
import com.test.service.province.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;


@RestController
@RequestMapping
public class ProvinceController {
    @Autowired
    IProvinceService provinceService;

    @Autowired
    ICountryService countryService;

    @ModelAttribute("countries")
    public Iterable<Country> countries(){
        return countryService.findAll();
    }

    @GetMapping("/api")
    public ResponseEntity<Iterable<Province>> listP(){
       return new ResponseEntity<>(provinceService.findAll(), HttpStatus.OK);
    }


    @GetMapping("/province")
    public ModelAndView listProvince(){
        Iterable<Province> provinces = provinceService.findAll();
        ModelAndView modelAndView = new ModelAndView("/province/list");
        modelAndView.addObject("province",provinces);
        return modelAndView;
    }

    @PostMapping("/create-province")
    public ResponseEntity<Province> createProvince(@RequestBody Province province){
        System.out.println(province);
        return new ResponseEntity<>(provinceService.save(province),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-province/{id}")
    public ResponseEntity<Province> deleteSmartphone(@PathVariable long id) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        provinceService.remove(id);
        return new ResponseEntity<>(provinceOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/edit-province/{id}")
    public ResponseEntity<Province> editProvince(@RequestBody Province province,@PathVariable Long id){
        province.setId(id);
        return new ResponseEntity<>(provinceService.save(province),HttpStatus.OK);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<Province> showApi(@PathVariable long id){
        Optional<Province> optional = provinceService.findById(id);
        return new ResponseEntity<>(optional.get(),HttpStatus.OK);
    }


}
