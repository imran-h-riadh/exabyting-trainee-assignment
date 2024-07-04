package com.exabyting.rms.DTOs;

import com.exabyting.rms.Entities.Helper.JobApplicationStatus;
import jakarta.validation.constraints.Pattern;
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
//    @Pattern(regexp = "^(http|https|ftp)://([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})(:[0-9]{1,5})?(/[a-zA-Z0-9_.-]*)?$",
//            message = "Invalid URL")
    private String socialUrl;
    private String resumeLink;
    private JobApplicationStatus status;
    private Integer jobOpeningId;
    private Integer userId;
}
