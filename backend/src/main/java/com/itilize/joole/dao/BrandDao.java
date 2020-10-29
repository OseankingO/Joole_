package com.itilize.joole.dao;

import com.itilize.joole.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandDao extends JpaRepository<BrandEntity, Integer> {
}
