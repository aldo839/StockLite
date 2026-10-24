package com.techdrawer.stocklite.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter @Setter
public class Validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private Instant creation;

    private Instant expiration;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

}
