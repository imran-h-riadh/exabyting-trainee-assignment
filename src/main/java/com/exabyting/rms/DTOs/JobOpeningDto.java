package com.exabyting.rms.DTOs;

import com.exabyting.rms.Entities.Helper.JobOpeningStatus;
import com.exabyting.rms.Entities.JobApplication;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobOpeningDto {

    private Integer id;
    private String jobTitle;

    private String jobDescription;

    private String requirements;

    private Integer NoOfVacancy;

    private LocalDateTime deadLine;

    private JobOpeningStatus status;

}
