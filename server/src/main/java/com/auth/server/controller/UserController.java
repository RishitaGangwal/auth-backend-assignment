package com.auth.server.controller;

import com.auth.server.model.Card;
import com.auth.server.model.User;
import com.auth.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/basic")
    public ResponseEntity<?> saveBasicInfo(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String name = data.get("name");
        String dob = data.get("dob");
        String address = data.get("address");

        try {
            userService.saveBasicInfo(email, name, dob, address);
            return ResponseEntity.ok(Map.of("message", "Basic info saved"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String otp = data.get("otp");

        try {
            userService.verifyUser(email, otp);
            return ResponseEntity.ok(Map.of("message", "User verified successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/cards")
    public ResponseEntity<?> addCard(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String cardNumber = data.get("cardNumber");
        String expiryMonth = data.get("expiryMonth");
        String expiryYear = data.get("expiryYear");

        try {
            userService.addCard(email, cardNumber, expiryMonth, expiryYear);
            return ResponseEntity.ok(Map.of("message", "Card added successfully"));
        } catch (RuntimeException e) {
            if (e.getMessage().equals("User not verified")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/cards")
    public ResponseEntity<?> getCards(@RequestParam String email) {
        try {
            List<Card> cards = userService.getCards(email);
            return ResponseEntity.ok(cards);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
