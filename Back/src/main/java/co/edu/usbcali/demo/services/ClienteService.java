package co.edu.usbcali.demo.services;

import co.edu.usbcali.demo.models.Cliente;
import co.edu.usbcali.demo.repositories.ClienteRepositoiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class ClienteService {
    @Autowired
    private final ClienteRepositoiry clienteRepository;
    public ClienteService(ClienteRepositoiry clienteRepository){this.clienteRepository=clienteRepository;}

    public List<Cliente> getClientes(){return clienteRepository.findAll();}

    public Optional<Cliente> getCliente(Long id){return clienteRepository.findById(id);}

}
