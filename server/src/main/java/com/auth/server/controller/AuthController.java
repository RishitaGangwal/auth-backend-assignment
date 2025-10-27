package com.auth.server.controller;

import com.auth.server.model.User;
import com.auth.server.repository.UserRepository;
import com.auth.server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Signup successful",
                "email", user.getEmail()
        ));
    }


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> data) {
        Optional<User> userOpt = userRepo.findByEmail(data.get("email"));

        if (userOpt.isEmpty() || !encoder.matches(data.get("password"), userOpt.get().getPassword())) {
            return Map.of("error", "Invalid credentials");
        }

        User user = userOpt.get();
        String token = jwtUtil.generateToken(user.getEmail());
        return Map.of("token", token);
    }
}
