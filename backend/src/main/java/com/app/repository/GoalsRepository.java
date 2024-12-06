package com.app.repository;

import com.app.entity.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GoalsRepository extends JpaRepository<Goals, UUID> {

    List<Goals> findByUserId (UUID userId);
}
