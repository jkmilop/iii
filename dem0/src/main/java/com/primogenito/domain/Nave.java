package com.primogenito.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NotNull
@Entity
@Table(name = "nave")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nave {
    @Id
    @NotNull
    @Column(name = "id_nave ", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CALL_SEQ_coon_nave")
    @SequenceGenerator(sequenceName = "SEQ_coon_nave", allocationSize = 1, name = "CALL_SEQ_coon_nave")
    private int id_nave;
    private int tipo_nave_id;
    private int pais_id;
    private Date fecha_fin_actividad;
    private Date fecha_inicio_actividad;

}