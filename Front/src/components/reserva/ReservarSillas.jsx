import React, { useState, useEffect } from 'react';
export default function ReservarSillas() {

    const [asientos, setAsientos] = useState([]);
    const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);

    useEffect(() => {
        obtenerAsientos();
    }, []);

    const obtenerAsientos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/sillaid');
            const datos = await respuesta.json();
            setAsientos(datos);
        } catch (error) {
            console.error(error.message);
        }
    };

    const seleccionarAsiento = (asiento) => {
        setAsientoSeleccionado(asiento);
    };

    const reservarAsiento = async (asiento) => {
        try {
            const respuesta = await fetch('http://localhost:3000/silla', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    negocio_id: asiento.negocio_id,
                    valor: asiento.valor,
                    posicion: asiento.posicion,
                    tipo_silla: asiento.tipo_silla,
                }),
            });
            const datos = await respuesta.json();
            console.log(datos); // Manejar la respuesta exitosa
            // Actualizar la lista de asientos o marcar el asiento como reservado
            obtenerAsientos();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Aplicación de Reserva de Boletos</h1>
            <div>
                <h2>Asientos Disponibles</h2>
                {asientos.map((asiento) => (
                    <div key={asiento.id}>
                        <span>Asiento {asiento.id}</span>
                        {asiento.isBooked ? (
                            <span>Reservado</span>
                        ) : (
                            <button onClick={() => reservarAsiento(asiento)}>
                                Reservar
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

