package com.primogenito.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripulanteDto {
    
	private int id_tripulante;
    private int pais_id;
    private int edad;
    private Date fecha_retiro;
    private String nombre;
    private String apellido;
    private boolean estado;

}