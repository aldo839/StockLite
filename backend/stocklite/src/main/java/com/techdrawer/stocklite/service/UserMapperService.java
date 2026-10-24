package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.UserResponseDTO;
import com.techdrawer.stocklite.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapperService {

    public UserResponseDTO mapToResponseDTO (User user) {

        return new UserResponseDTO(

                user.getPublicId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getIsActivated(),
                user.getIsValidated()

        );
    }
}
