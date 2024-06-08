package com.exabyting.rms.Repositories;

import com.exabyting.rms.Entities.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication,Integer> {

    Page<JobApplication> findByUserId(Integer userId, Pageable pageable);
    Page<JobApplication> findByJobOpeningId(Integer jobOpeningId,Pageable pageable);

}
