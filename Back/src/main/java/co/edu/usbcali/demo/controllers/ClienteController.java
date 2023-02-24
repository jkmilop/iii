package co.edu.usbcali.demo.controllers;

import co.edu.usbcali.demo.models.Cliente;
import co.edu.usbcali.demo.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping(path="/cliente")
public class ClienteController {
    @Autowired
    private final ClienteService clienteService;
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping(path = "/")
    public List<Cliente> getClientes(){
        return clienteService.getClientes();
    }

    @GetMapping(path = "/id")
    public Optional<Cliente> getCliente(@PathVariable("id")Long id){
        return clienteService.getCliente(id);
    }
}
