package com.primogenito.dto;
 

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data             
@AllArgsConstructor
@NoArgsConstructor
public class TipoNaveDTO{
    private int id_tipo_nave ;
    private String nombre_tipo_nave;
    private String proposito;
    private Float potencia;
    private Float velocidad;
    private Float peso;
    private Float orbita;

}