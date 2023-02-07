package com.primogenito.dto;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NaveDTO{
    private int id_nave ;
    private int tipo_nave_id;
    private int pais_id;
    private Date fecha_fin_actividad;
    private Date fecha_inicio_actividad;
    
}