package com.itb.inf2am.divulgai.model.services;

import com.itb.inf2am.divulgai.model.entity.Usuario;
import com.itb.inf2am.divulgai.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario save(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        if (usuario.getCpf() != null && usuarioRepository.existsByCpf(usuario.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id " + id));
    }

    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha)
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setCpf(usuario.getCpf());
        usuarioExistente.setTelefone(usuario.getTelefone());
        usuarioExistente.setDataNascimento(usuario.getDataNascimento());
        usuarioExistente.setSexo(usuario.getSexo());
        usuarioExistente.setTipoUsuario(usuario.getTipoUsuario());
        usuarioExistente.setStatusUsuario(usuario.getStatusUsuario());
        
        if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
            usuarioExistente.setSenha(usuario.getSenha());
        }
        
        return usuarioRepository.save(usuarioExistente);
    }

    public void delete(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioRepository.delete(usuarioExistente);
    }
}
