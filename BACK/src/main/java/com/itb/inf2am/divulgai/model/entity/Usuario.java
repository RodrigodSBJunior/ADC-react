package com.itb.inf2am.divulgai.model.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String senha;

    @Column(length = 15, nullable = true)
    private String cpf;

    @Column(length = 15, nullable = true)
    private String telefone;

    @Column(name = "data_nascimento", nullable = true)
    private LocalDate dataNascimento;

    @Column(length = 1, nullable = true)
    private String sexo;

    @Column(length = 20, nullable = false)
    private String tipoUsuario; // PACIENTE, PROFISSIONAL

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
        this.statusUsuario = true;
        if (this.tipoUsuario == null || this.tipoUsuario.isEmpty()) {
            this.tipoUsuario = "PACIENTE";
        }
    }

    @Column
    private boolean statusUsuario;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }



    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public boolean getStatusUsuario() {
        return statusUsuario;
    }

    public void setStatusUsuario(boolean statusUsuario) {
        this.statusUsuario = statusUsuario;
    }

}
