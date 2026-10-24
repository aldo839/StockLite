package com.techdrawer.stocklite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID publicId = UUID.randomUUID();

    private String username;

    private String email;

    private String password;

    private String phone;

    private Role role;

    private Boolean isActivated = false;

    private Boolean isValidated = false;
}