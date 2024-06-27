package com.exabyting.rms.DTOs;

import com.exabyting.rms.Entities.Helper.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {

    private Integer id;


    private String name;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private List<Role> roles=new ArrayList<>();

    private ProfileDto profile;
}
