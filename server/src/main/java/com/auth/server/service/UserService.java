package com.auth.server.service;

import com.auth.server.model.Card;
import com.auth.server.model.User;
import com.auth.server.repository.CardRepository;
import com.auth.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CardRepository cardRepo;


    public User saveBasicInfo(String email, String name, String dob, String address) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(name);
        user.setDob(dob);
        user.setAddress(address);
        return userRepo.save(user);
    }


    public User verifyUser(String email, String otp) {
        if (!"123456".equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        return userRepo.save(user);
    }


    public Card addCard(String email, String cardNumber, String expiryMonth, String expiryYear) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("User not verified");
        }

        Card card = new Card();
        card.setCardNumber(cardNumber);
        card.setExpiryMonth(expiryMonth);
        card.setExpiryYear(expiryYear);
        card.setUser(user);
        return cardRepo.save(card);
    }

    public List<Card> getCards(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cardRepo.findByUser(user);
    }
}
