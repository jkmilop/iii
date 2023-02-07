package com.primogenito.domain;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cooperativa")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cooperativa {
    private int consecutivo ;
    private int pais_id ;
    private int mision_id ;
    private String desripcion;
}