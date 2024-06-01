package com.exabyting.rms.Entities.Helper;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {

    private String street;
    private String city;
    private String country;
}
