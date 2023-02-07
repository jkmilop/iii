package com.primogenito.service;
import org.springframework.stereotype.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.primogenito.domain.Tripulante;
import com.primogenito.repository.TripulanteRepository;
@Service
public class TripulanteServiceImpl implements TripulanteService {
	
	@Autowired
	TripulanteRepository tripulanteRepository;
	
	@Override
	public List<Tripulante> consultarTripulantes() {
		 
		// consulta  todos los tripulantes
		return tripulanteRepository.findAll();
		
	}

}
