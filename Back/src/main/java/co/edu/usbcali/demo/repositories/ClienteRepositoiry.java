package co.edu.usbcali.demo.repositories;

import co.edu.usbcali.demo.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepositoiry extends JpaRepository<Cliente,Long> {
}
