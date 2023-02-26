package co.edu.usbcali.demo.controllers;

import co.edu.usbcali.demo.models.Cliente;
import co.edu.usbcali.demo.services.ClienteServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path="/cliente")
public class ClienteController {
    @Autowired
    private  ClienteServiceInterface clienteService;

    public ClienteController(ClienteServiceInterface clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping(path = "/find-clientes")
    public List<Cliente> getClientes(){
        return clienteService.getClientes();
    }

    @GetMapping(path = "/find-cliente/{id}")
    public Cliente getCliente(@PathVariable("id")Long id){
        return clienteService.getCliente(id);
    }
    @PostMapping(path = "/save-cliente")
    public Cliente saveCliente(@RequestBody Cliente cliente){
        return clienteService.saveCliente(cliente);
    }
    @PostMapping(path = "/update-cliente/{id}")
    public Cliente updateCliente(@RequestBody Cliente cliente,@PathVariable("id")Long id){
        return clienteService.updateCliente(cliente,id);
    }
    @DeleteMapping(path = "/delete-cliente/{id}")
    public List<Cliente> deleteCliente(@PathVariable("id")Long id){
        return clienteService.deleteCliente(id);
    }

}
