package com.primogenito.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoopertivaDTO{
	private int consecutivo ;
    private int pais_id ;
    private int mision_id ;
    private String desripcion;
    
}