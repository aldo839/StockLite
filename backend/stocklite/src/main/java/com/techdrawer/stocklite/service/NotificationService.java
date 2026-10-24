package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.model.Validation;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender javaMailSender;

    public void sendValidation (Validation validation) {

        SimpleMailMessage message = new SimpleMailMessage();

        String text = String.format(
                "Hello %s \nYour validation code is %s",
                validation.getUser().getUsername(),
                validation.getCode()
        );

        message.setFrom("noreply@stocklite");
        message.setTo(validation.getUser().getEmail());
        message.setSubject("Validation code");
        message.setText(text);

        javaMailSender.send(message);
    }

}
