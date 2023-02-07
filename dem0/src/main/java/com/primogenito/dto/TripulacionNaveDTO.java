package com.primogenito.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripulacionNaveDTO{
	
    private int tripulante_id;
    private int consecutivo;
    private int nave_id;

}

