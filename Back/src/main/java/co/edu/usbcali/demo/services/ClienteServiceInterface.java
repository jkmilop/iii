package co.edu.usbcali.demo.services;

import co.edu.usbcali.demo.models.Cliente;

import java.util.List;

public interface ClienteServiceInterface {
    public List<Cliente> getClientes();
    public Cliente getCliente(Long id);
    public Cliente updateCliente(Cliente newCliente) ;
    public Cliente saveCliente(Cliente cliente);
    public List<Cliente> deleteCliente(Long id);
}
