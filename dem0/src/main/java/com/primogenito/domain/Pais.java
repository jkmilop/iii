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
@Table(name = "pais")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pais {
	@Id
	@Column(name = "id_pais", unique = true, nullable = false)
	@NotNull
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CALL_SEQ_spsh_pais")
	@SequenceGenerator(sequenceName = "CALL_SEQ_spsh_pais", allocationSize = 1, name = "CALL_SEQ_spsh_pais")
    private int id_pais;
    private String nombre;

}
