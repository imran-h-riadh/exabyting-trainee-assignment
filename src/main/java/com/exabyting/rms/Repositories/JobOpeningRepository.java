package com.exabyting.rms.Repositories;

import com.exabyting.rms.Entities.Helper.JobOpeningStatus;
import com.exabyting.rms.Entities.JobOpening;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOpeningRepository extends JpaRepository<JobOpening,Integer> {

    Page<JobOpening> findByStatus(JobOpeningStatus status, Pageable pageable);
}
