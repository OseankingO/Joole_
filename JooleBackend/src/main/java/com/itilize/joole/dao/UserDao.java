package com.itilize.joole.dao;

import com.itilize.joole.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUsername(String username);
}
