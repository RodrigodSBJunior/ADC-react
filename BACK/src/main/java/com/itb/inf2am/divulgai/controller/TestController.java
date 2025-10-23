package com.itb.inf2am.divulgai.controller;

import com.itb.inf2am.divulgai.model.entity.Usuario;
import com.itb.inf2am.divulgai.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class TestController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/test")
    public String test() {
        return "API funcionando!";
    }

    @PostMapping("/criar-usuarios-teste")
    public String criarUsuariosTeste() {
        try {
            Usuario paciente = new Usuario();
            paciente.setNome("João Silva");
            paciente.setEmail("joao@email.com");
            paciente.setSenha("123456");
            paciente.setCpf("12345678901");
            paciente.setTelefone("11999999999");
            paciente.setDataNascimento(java.time.LocalDate.of(1990, 1, 1));
            paciente.setSexo("M");
            paciente.setTipoUsuario("PACIENTE");
            usuarioService.save(paciente);

            Usuario profissional = new Usuario();
            profissional.setNome("Maria Santos");
            profissional.setEmail("maria@email.com");
            profissional.setSenha("123456");
            profissional.setCpf("98765432100");
            profissional.setTelefone("11888888888");
            profissional.setDataNascimento(java.time.LocalDate.of(1985, 5, 15));
            profissional.setSexo("F");
            profissional.setTipoUsuario("PROFISSIONAL");
            usuarioService.save(profissional);

            return "Usuários de teste criados com sucesso!";
        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }
}