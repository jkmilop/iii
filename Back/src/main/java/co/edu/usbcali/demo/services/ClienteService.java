package co.edu.usbcali.demo.services;

import co.edu.usbcali.demo.models.Cliente;
import co.edu.usbcali.demo.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ClienteService implements ClienteServiceInterface{
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> getClientes() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @Override
    public Cliente getCliente(Long id) {
        if (id==null){
            throw new IllegalArgumentException("El cliente es obligatorio.");
        }
        Optional<Cliente> clienteOptional=clienteRepository.findById(id);
        if (clienteOptional.isEmpty()){
            throw new IllegalArgumentException("El cliente no existe.");
        }
        return clienteOptional.get();
        }

    @Override
    public Cliente updateCliente(Cliente newCliente,Long id) {
        if (newCliente==null){
            throw new IllegalArgumentException("El cliente es obligatorio.");
        }
        if (newCliente.getNombre()==null){
            throw new IllegalArgumentException("El nombre es obligatorio.");
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
        if (newCliente.getCelular()==null){
            throw new IllegalArgumentException("El número es obligatorio.");
        }
        
        Cliente instanciaCliente = clienteRepository.findById(id).get();
        instanciaCliente.setId(newCliente.getId());
        instanciaCliente.setCelular(newCliente.getCelular());
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
        if (cliente.getNombre()==null){
            throw new IllegalArgumentException("El nombre es obligatorio.");
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
        if (cliente.getCelular()==null){
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
        return (List<Cliente>) clienteRepository.findAll();
    }
}
