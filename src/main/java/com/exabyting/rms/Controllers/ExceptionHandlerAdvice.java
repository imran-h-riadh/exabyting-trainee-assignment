package com.exabyting.rms.Controllers;

import com.exabyting.rms.Exception.ApiException;
import com.exabyting.rms.Exception.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(CustomException.class)
    ResponseEntity<?>handleApiException(CustomException ex){
        return new ResponseEntity<>(new ApiException(ex.getMessage(), ex.getStatus()),ex.getStatus());
    }
}
