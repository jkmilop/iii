package com.primogenito.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MisionDTO{
    private int id_mision;
    private String codigo;
    private int destino_id;
    private int nave_id;
    private String descripcion;
    private String estado;
    private Date fecha_regreso_mision; 
    private Date fecha_mision; 

}