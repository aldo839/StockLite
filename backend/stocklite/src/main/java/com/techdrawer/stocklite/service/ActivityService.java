package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.model.Activity;
import com.techdrawer.stocklite.model.ActivityType;
import com.techdrawer.stocklite.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public void record(
            ActivityType type,
            String description,
            LocalDateTime dateTime
    ) {
        Activity activity = new Activity();

        activity.setType(type);
        activity.setDescription(description);
        activity.setDataTime(String.valueOf(dateTime));

        activityRepository.save(activity);
    }

}
