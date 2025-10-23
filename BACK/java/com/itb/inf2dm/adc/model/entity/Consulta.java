package com.itb.inf2dm.adc.model.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Consulta")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate dataConsulta;
    @Column(length = 10, nullable = false)
    private String horaConsulta;
    @Column(length = 50, nullable = true)
    private String tipoConsulta;
    @Column(nullable = false)
    private Long consultorioId;
    @Column(nullable = false)
    private Long usuarioId;
    @Column(nullable = true)
    private Long agendaId;
    private Boolean codStatus;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataConsulta() {
        return dataConsulta;
    }

    public void setDataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
    }

    public String getHoraConsulta() {
        return horaConsulta;
    }

    public void setHoraConsulta(String horaConsulta) {
        this.horaConsulta = horaConsulta;
    }

    public String getTipoConsulta() {
        return tipoConsulta;
    }

    public void setTipoConsulta(String tipoConsulta) {
        this.tipoConsulta = tipoConsulta;
    }

    public Boolean getCodStatus() {
        return codStatus;
    }

    public Long getConsultorioId() {
        return consultorioId;
    }

    public void setConsultorioId(Long consultorioId) {
        this.consultorioId = consultorioId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getAgendaId() {
        return agendaId;
    }

    public void setAgendaId(Long agendaId) {
        this.agendaId = agendaId;
    }

    public void setCodStatus(Boolean codStatus) {
        this.codStatus = codStatus;
    }

}