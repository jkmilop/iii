package co.edu.usbcali.demo.models;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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
    private String estado;
    @Column(name ="fecha_creacion")

    private Date fechaCreacion;
    @Column(name ="fecha_modificacion")

    private Date fechaModificacion;


}
