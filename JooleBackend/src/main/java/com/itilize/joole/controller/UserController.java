package com.itilize.joole.controller;

import com.itilize.joole.entity.UserEntity;
import com.itilize.joole.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> getAllUsers() {
        Optional<List<UserEntity>> result = userService.getAllUser();
        if(result.isPresent()) {
            return new ResponseEntity<>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User Found!", HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@RequestBody UserEntity userEntity) {
        Optional<UserEntity> res = userService.createUser(userEntity);
        if(res.isPresent()) {
            return new ResponseEntity<>(res.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Username Existed!", HttpStatus.OK);
    }

}
