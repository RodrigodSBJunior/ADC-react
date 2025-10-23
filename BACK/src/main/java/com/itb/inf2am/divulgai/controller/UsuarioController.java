package com.itb.inf2am.divulgai.controller;

import com.itb.inf2am.divulgai.model.entity.Usuario;
import com.itb.inf2am.divulgai.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Object> cadastrar(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", e.getMessage()
                )
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String senha = loginData.get("senha");
            
            Usuario usuario = usuarioService.login(email, senha);
            
            return ResponseEntity.ok(Map.of(
                "message", "Login realizado com sucesso",
                "usuario", usuario
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of(
                    "status", 401,
                    "error", "Unauthorized",
                    "message", e.getMessage()
                )
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarUsuarioPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(usuarioService.findById(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", "Usuário não encontrado com o id " + id
                )
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        try {
            Long usuarioId = Long.parseLong(id);
            Usuario usuarioAtualizado = usuarioService.update(usuarioId, usuario);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", e.getMessage()
                )
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirUsuario(@PathVariable String id) {
        try {
            Long usuarioId = Long.parseLong(id);
            usuarioService.delete(usuarioId);
            return ResponseEntity.ok(Map.of("message", "Usuário deletado com sucesso"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "status", 400,
                    "error", "Bad Request",
                    "message", "O id informado não é válido: " + id
                )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                Map.of(
                    "status", 404,
                    "error", "Not Found",
                    "message", e.getMessage()
                )
            );
        }
    }
}