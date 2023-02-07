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
@Table(name = "tipo_nave")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoNave {
    @NotNull
	@Id
	@Column(name = "id_tipo_nave ", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CALL_SEQ_coon_tipo_nave")
	@SequenceGenerator(sequenceName = "SEQ_coon_tipo_nave", allocationSize = 1, name = "CALL_SEQ_coon_tipo_nave")
    private int id_tipo_nave ;
    private String nombre_tipo_nave;
    private String proposito;
    private Float potencia;
    private Float velocidad;
    private Float peso;
    private Float orbita;

}