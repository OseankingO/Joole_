package com.itilize.joole.service;

import com.itilize.joole.dao.BrandDao;
import com.itilize.joole.entity.BrandEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandDao brandDao;

    public Optional<BrandEntity> getBrandEntityById(int id) {
        Optional<BrandEntity> res = brandDao.findById(id);
        if(res.isPresent()) {
            System.out.println("I have value");
            return res;
        } else {
            System.out.println("I don't have value");
            return Optional.empty();
        }
    }
}
