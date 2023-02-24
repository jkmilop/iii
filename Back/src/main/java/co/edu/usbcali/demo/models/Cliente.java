package co.edu.usbcali.demo.models;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name ="cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer cedula;
    private Integer numero;
    private String correo;

}
