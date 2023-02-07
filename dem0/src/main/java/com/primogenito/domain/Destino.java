package com.primogenito.domain;

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
@Table(name = "Destino ")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Destino {
    @NotNull
	@Id
	@Column(name = "id_destino", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_coon_destino")
	@SequenceGenerator(sequenceName = "SEQ_coon_destino", allocationSize = 1, name = "SEQ_coon_destino")
    private int id_destino;
    private String nombre_destino;
    private float area; 

}
