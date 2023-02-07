package com.primogenito.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DestinoDTO{
    private int id_destino;
    private String nombre_destino;
    private float area; 

}
