package co.edu.usbcali.demo.services;

import co.edu.usbcali.demo.models.Cliente;
import co.edu.usbcali.demo.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class ClienteService implements ClienteServiceInterface{
    private ClienteRepository clienteRepository;
    @Override
    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente getCliente(Long id) {
        if (id==null){
            throw new IllegalArgumentException("El cliente es obligatorio");
        }
        Optional<Cliente> clienteOptional=clienteRepository.findById(id);
        if (clienteOptional.isEmpty()){
            throw new IllegalArgumentException("El cliente no existe");
        }
        return clienteOptional.get();
        }

    @Override
    public Cliente updateCliente(Cliente newCliente) {
        if (newCliente==null){
            throw new IllegalArgumentException("El cliente es obligatorio.");
        }
        if (newCliente.getId()==null){
            throw new IllegalArgumentException("El id del cliente es obligatorio.");
        }
        if (newCliente.getCedula()==null){
            throw new IllegalArgumentException("El número de cedula es obligatorio.");
        }
        if (newCliente.getCorreo()==null){
            throw new IllegalArgumentException("El correo es obligatorio.");
        }
        if (newCliente.getNumero()==null){
            throw new IllegalArgumentException("El número es obligatorio.");
        }
        Cliente instanciaCliente = new Cliente();
        instanciaCliente.setId(newCliente.getId());
        instanciaCliente.setNumero(newCliente.getNumero());
        instanciaCliente.setFechaModificacion(new Date());
        instanciaCliente.setFechaCreacion(new Date());
        instanciaCliente.setCorreo(newCliente.getCorreo());
        instanciaCliente.setEstado(newCliente.getEstado());
        return clienteRepository.save(instanciaCliente);
    }

    @Override
    public Cliente saveCliente(Cliente cliente) {
        if (cliente==null){
            throw new IllegalArgumentException("El cliente es obligatorio");
        }
        if (cliente.getId()==null){
            throw new IllegalArgumentException("El id del cliente es obligatorio");
        }
        if (cliente.getCedula()==null){
            throw new IllegalArgumentException("El número de cedula es obligatorio");
        }
        if (cliente.getCorreo()==null){
            throw new IllegalArgumentException("El correo es obligatorio");
        }
        if (cliente.getNumero()==null){
            throw new IllegalArgumentException("El número es obligatorio");
        }
        return clienteRepository.save(cliente);
    }

    @Override
    public List <Cliente> deleteCliente(Long id ) {
        if (id==null){
            throw new IllegalArgumentException("El id del cliente es obligatorio");
        }
        clienteRepository.deleteById(id);
        return clienteRepository.findAll();
    }
}
