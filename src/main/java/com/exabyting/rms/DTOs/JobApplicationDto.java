package com.exabyting.rms.DTOs;

import com.exabyting.rms.Entities.Helper.JobApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobApplicationDto {
    private Integer id;
    private String resumeLink;
    private JobApplicationStatus status;
    private Integer jobOpeningId;
    private Integer userId;
}
