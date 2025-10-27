package com.auth.server.repository;

import com.auth.server.model.Card;
import com.auth.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
   List<Card> findByUser(User user);
}
