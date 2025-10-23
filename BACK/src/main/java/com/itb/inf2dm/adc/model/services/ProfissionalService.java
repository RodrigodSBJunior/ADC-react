package com.itb.inf2dm.adc.model.services;

import com.itb.inf2dm.adc.model.entity.Profissional;
import com.itb.inf2dm.adc.model.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfissionalService {
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    public Profissional save(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }
    
    public void delete(Long id) {
        profissionalRepository.deleteById(id);
    }
    
    public List<Profissional> findAll() {
        return profissionalRepository.findAll();
    }
    
    public Optional<Profissional> findById(Long id) {
        return profissionalRepository.findById(id);
    }
    
    public Profissional update(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }
}
