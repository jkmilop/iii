package com.primogenito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.primogenito.domain.Tripulante;

// coincidir clase domain y el tipo de atributo de la llave primaria
public interface TripulanteRepository extends JpaRepository<Tripulante , Integer>{

}
