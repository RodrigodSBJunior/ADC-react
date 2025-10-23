package com.itb.inf2dm.adc.model.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


@Entity
@DiscriminatorValue(value = "PACIENTE")
public class Paciente extends Usuario{
}
