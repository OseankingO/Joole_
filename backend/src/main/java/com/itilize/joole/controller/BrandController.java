package com.itilize.joole.controller;

import com.itilize.joole.entity.BrandEntity;
import com.itilize.joole.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    BrandService brandService;

    @GetMapping("/{brandId}")
    public @ResponseBody BrandEntity getBrandById(@PathVariable int brandId) {
        BrandEntity res = brandService.getBrandEntityById(brandId).get();
        System.out.println(res.getName());
        return res;
    }
}