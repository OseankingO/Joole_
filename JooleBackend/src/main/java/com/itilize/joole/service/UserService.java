package com.itilize.joole.service;

import com.itilize.joole.dao.UserDao;
import com.itilize.joole.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public Optional<List<UserEntity>> getAllUser() {
        List<UserEntity> users = userDao.findAll();
        if (!users.isEmpty())
        {
            return Optional.of(users);
        }
        return Optional.empty();
    }

    public Optional<UserEntity> createUser(UserEntity user) {
        UserEntity existUser = userDao.findByUsername(user.getUsername());
        if(existUser != null) {
            return Optional.empty();
        } else {
            userDao.save(user);
            UserEntity createdUserCredential = userDao.findByUsername(user.getUsername());
//            createdUserCredential.setPassword("");
            return Optional.of(createdUserCredential);
        }
    }
}
