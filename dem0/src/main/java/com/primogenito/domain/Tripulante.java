package com.primogenito.domain;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tripulante")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tripulante {
    @NotNull
	@Id
	@Column(name = "id_tripulante", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CALL_SEQ_coon_tripulante")
	@SequenceGenerator(sequenceName = "SEQ_coon_tripulante", allocationSize = 1, name = "CALL_SEQ_coon_tripulante")
    private int id_tripulante;
    private int pais_id;
    private int edad;
    private Date fecha_retiro;
    private String nombre;
    private String apellido;
    private boolean estado;

}