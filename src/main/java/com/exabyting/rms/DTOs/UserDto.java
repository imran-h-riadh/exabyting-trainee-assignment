package com.exabyting.rms.DTOs;

import com.exabyting.rms.Entities.Helper.Role;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {

    private Integer id;


    private String name;

    private String email;

    private String password;

    private List<Role> roles=new ArrayList<>();

    private ProfileDto profile;
}
