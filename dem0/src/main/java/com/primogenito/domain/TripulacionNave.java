package com.primogenito.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "tripulacion_nave ")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class TripulacionNave {
    private int tripulante_id;
    
    private int consecutivo;
    private int nave_id;

}

