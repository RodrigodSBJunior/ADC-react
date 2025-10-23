package com.itb.inf2dm.adc.model.repository;

import com.itb.inf2dm.adc.model.entity.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    private String cpi;


}