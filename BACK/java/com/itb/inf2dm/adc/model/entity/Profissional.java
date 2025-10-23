package com.itb.inf2dm.adc.model.entity;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value = "PROFISSIONAL")
public class Profissional extends Usuario {
}
