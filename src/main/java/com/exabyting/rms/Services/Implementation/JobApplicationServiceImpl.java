package com.exabyting.rms.Services.Implementation;

import com.exabyting.rms.DTOs.JobApplicationDto;
import com.exabyting.rms.DTOs.JobOpeningDto;
import com.exabyting.rms.Entities.Helper.JobApplicationStatus;
import com.exabyting.rms.Entities.JobApplication;
import com.exabyting.rms.Entities.JobOpening;
import com.exabyting.rms.Entities.User;
import com.exabyting.rms.Exception.ResourceNotFound;
import com.exabyting.rms.Repositories.JobApplicationRepository;
import com.exabyting.rms.Repositories.JobOpeningRepository;
import com.exabyting.rms.Repositories.UserRepository;
import com.exabyting.rms.Services.ApplicationServices;
import com.exabyting.rms.Utils.PageableResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationServiceImpl implements ApplicationServices {


    @Autowired
    private JobOpeningRepository jobOpeningRepository;
    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public JobApplicationDto create(JobApplicationDto jobApplicationDto) throws ResourceNotFound {

        User user = userRepository.findById(jobApplicationDto.getUserId()).orElseThrow(
                () -> new ResourceNotFound("userNotFound with id " + jobApplicationDto.getUserId())
        );

        JobOpening jobOpening = jobOpeningRepository.findById(jobApplicationDto.getJobOpeningId()).orElseThrow(
                ()->new ResourceNotFound("Job not found")
        );

        JobApplication application = JobApplication.builder()
                .resumeLink(jobApplicationDto.getResumeLink())
                .jobOpening(jobOpening)
                .user(user)
                .status(JobApplicationStatus.PENDING)
                .build();
        JobApplication save = applicationRepository.save(application);


        return JobApplicationDto.builder()
                .jobOpeningId(jobApplicationDto.getId())
                .userId(user.getId())
                .resumeLink(save.getResumeLink())
                .status(save.getStatus())
                .build();
    }

    @Override
    public JobApplicationDto update(Integer id, JobApplicationStatus status) throws ResourceNotFound {
        JobApplication application = applicationRepository.findById(id).orElseThrow(() ->
                new ResourceNotFound("application not found"));
        application.setStatus(status);
        JobApplication save = applicationRepository.save(application);
        return JobApplicationDto.builder()
                .jobOpeningId(save.getJobOpening().getId())
                .userId(save.getUser().getId())
                .resumeLink(save.getResumeLink())
                .status(save.getStatus())
                .build();

    }

    @Override
    public PageableResponse<JobApplicationDto> byJob(Integer pageNumber, Integer pageSize, String sortBy, String sortDir, Integer jobId) {

        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);
        Page<JobApplication> byJobOpeningId = applicationRepository.findByJobOpeningId(jobId, pageable);
        List<JobApplicationDto> list = byJobOpeningId.stream().map(e -> JobApplicationDto.builder()
                .jobOpeningId(e.getId())
                .userId(e.getId())
                .resumeLink(e.getResumeLink())
                .status(e.getStatus())
                .build()).toList();

        return new PageableResponse<>(list,pageNumber,pageSize,byJobOpeningId.getTotalElements());
    }

    @Override
    public PageableResponse<JobApplicationDto> byUser(Integer pageNumber, Integer pageSize, String sortBy, String sortDir, Integer userId) {
        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);
        Page<JobApplication> byJobOpeningId = applicationRepository.findByUserId(userId, pageable);
        List<JobApplicationDto> list = byJobOpeningId.stream().map(e -> JobApplicationDto.builder()
                .jobOpeningId(e.getId())
                .userId(e.getId())
                .resumeLink(e.getResumeLink())
                .status(e.getStatus())
                .build()).toList();

        return new PageableResponse<>(list,pageNumber,pageSize,byJobOpeningId.getTotalElements());
    }
}
