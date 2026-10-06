package com.techdrawer.stocklite.controller;

import com.techdrawer.stocklite.model.Activity;
import com.techdrawer.stocklite.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityRepository activityRepository;

    @GetMapping("/")
    public ResponseEntity<List<Activity>> getActivities(){

        return new ResponseEntity<>(activityRepository.findAll(), HttpStatus.OK);
    }

}
