package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.TripRequest;
import com.example.tripplanner.application.dto.TripResponse;
import com.example.tripplanner.application.mapper.TripMapper;
import com.example.tripplanner.domain.model.Trip;
import com.example.tripplanner.domain.model.TripStatus;
import com.example.tripplanner.domain.model.User;
import com.example.tripplanner.domain.port.TripRepository;
import com.example.tripplanner.domain.port.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateTripUseCase {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    @Transactional
    public TripResponse execute(TripRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + request.getUserId()));

        Trip trip = Trip.builder()
                .user(user)
                .title(request.getTitle())
                .destination(request.getDestination())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .budget(request.getBudget())
                .status(TripStatus.PLANNING)
                .build();

        return TripMapper.toResponse(tripRepository.save(trip));
    }
}

