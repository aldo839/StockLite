package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.model.User;
import com.techdrawer.stocklite.model.Validation;
import com.techdrawer.stocklite.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class ValidationService {

    private final ValidationRepository validationRepository;
    private final NotificationService notificationService;

    public void register(User user){

        Validation validation = new Validation();

        Instant creation = Instant.now();
        Instant expiration = creation.plus(15, ChronoUnit.MINUTES);

        SecureRandom random = new SecureRandom();
        Integer randomInt = random.nextInt(999999);
        String code = String.format("%d", randomInt);

        validation.setUser(user);
        validation.setCreation(creation);
        validation.setExpiration(expiration);
        validation.setCode(code);

        notificationService.sendValidation(validation);

        validationRepository.save(validation);
    }
}
