package com.primogenito.domain;

import java.sql.Date;

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

@Entity
@Table(name = "Mision ")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Mision {
    @NotNull
	@Id
	@Column(name = "id_mision ", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_coon_mision")
	@SequenceGenerator(sequenceName = "SEQ_coon_mision", allocationSize = 1, name = "SEQ_coon_mision")
    private int id_mision;
    private String codigo;
    private int destino_id;
    private int nave_id;
    private String descripcion;
    private String estado;
    private Date fecha_regreso_mision; 
    private Date fecha_mision; 

}