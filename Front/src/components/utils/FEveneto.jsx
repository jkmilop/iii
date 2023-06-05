import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';

export default function FEvento({ onSaveEvento, evento }) {
  const [negocioId, setNegocioId] = useState(evento?.negocio_id || '');
  const [fechaHora, setFechaHora] = useState(evento?.fecha_hora || '');
  const [nombreEvento, setNombreEvento] = useState(evento?.nombre_evento || '');
  const [negocioIds, setNegocioIds] = useState([]);

  const fetchNegocioIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/negocios');
      const jsonData = await response.json();
      const ids = jsonData.map((negocio) => negocio.negocio_id);
      setNegocioIds(ids);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchNegocioIds();
  }, []);

  const handleSave = () => {
    const newEvento = {
      negocio_id: negocioId,
      fecha_hora: fechaHora,
      nombre_evento: nombreEvento,
    };
    onSaveEvento(newEvento);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Negocio ID</FormLabel>
        <select
          value={negocioId}
          onChange={(e) => setNegocioId(e.target.value)}
          placeholder="ID del negocio"
        >

          {negocioIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>


      </FormControl>
      <FormControl>
        <FormLabel>Fecha y Hora</FormLabel>
        <Input
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
          placeholder="Fecha y hora del evento"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Nombre del Evento</FormLabel>
        <Input
          value={nombreEvento}
          onChange={(e) => setNombreEvento(e.target.value)}
          placeholder="Nombre del evento"
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave} >
        Guardar
      </Button>
    </Stack>
  );
}
