package com.itilize.joole.controller;

import com.itilize.joole.entity.UserEntity;
import com.itilize.joole.security.util.JwtUtil;
import com.itilize.joole.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://joole-frontend.s3-website.us-east-2.amazonaws.com")
@RestController
@RequestMapping("")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<?> getAllUsers() {
        Optional<List<UserEntity>> result = userService.getAllUser();
        if(result.isPresent()) {
            return new ResponseEntity<>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User Found!", HttpStatus.OK);
        }
    }

    @GetMapping("/user/username/{username}")
    @ResponseBody
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<UserEntity> result = userService.getUserByUsername(username);
        if(result.isPresent()) {
            return new ResponseEntity<>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User Found!", HttpStatus.OK);
        }
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        Optional<UserEntity> result = userService.getUserById(id    );
        if(result.isPresent()) {
            return new ResponseEntity<>(result.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User Found!", HttpStatus.OK);
        }
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<?> createUser(@RequestBody UserEntity userEntity) {
        String encodedPassword = passwordEncoder.encode(userEntity.getPassword());
        userEntity.setPassword(encodedPassword);
        Optional<UserEntity> res = userService.createUser(userEntity);
        if(res.isPresent()) {
            return new ResponseEntity<>(res.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Username Existed!", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody(required=false) UserEntity userEntity) throws Exception {
        if(userEntity == null) {
            return new ResponseEntity<>("Please sign in!", HttpStatus.OK);
        }

        try {
            System.out.println("Step2");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userEntity.getUsername(), userEntity.getPassword())
            );
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Incorrect username or password!", HttpStatus.NOT_FOUND);
        }
        System.out.println("Step3");
        final UserDetails userDetails = userService.loadUserByUsername(userEntity.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        System.out.println("Step4");
        System.out.println(jwt);
        Map<String, String> map = new HashMap<>();
        map.put("jwt", jwt);
        map.put("expiresIn", jwtTokenUtil.extractExpiration(jwt).toString());
        map.put("id", Integer.toString(userService.getUserByUsername(userEntity.getUsername()).get().getId()));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
