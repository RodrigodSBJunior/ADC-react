package com.itb.inf2dm.adc.controller;

import com.itb.inf2dm.adc.model.entity.Profissional;
import com.itb.inf2dm.adc.model.services.ProfissionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/profissional")
public class ProfissinalController {
    
    @Autowired
    private ProfissionalService profissionalService;
    
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Profissional profissional) {
        try {
            return ResponseEntity.ok(profissionalService.save(profissional));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar profissional");
        }
    }
    
    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            List<Profissional> profissionais = profissionalService.findAll();
            return ResponseEntity.ok(profissionais);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar profissionais");
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Optional<Profissional> profissional = profissionalService.findById(id);
            if (profissional.isPresent()) {
                return ResponseEntity.ok(profissional.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional não encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar profissional");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Profissional profissional) {
        try {
            if (profissionalService.findById(id).isPresent()) {
                profissional.setId(id);
                return ResponseEntity.ok(profissionalService.update(profissional));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional não encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar profissional");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            if (profissionalService.findById(id).isPresent()) {
                profissionalService.delete(id);
                return ResponseEntity.ok("Profissional deletado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional não encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao deletar profissional");
        }
    }
}
