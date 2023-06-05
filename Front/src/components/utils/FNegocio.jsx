import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';

export default function FNegocio({ onSaveNegocio, negocio }) {
  const [emprendedorId, setEmprendedorId] = useState(negocio?.emprendedor_id || '');
  const [nombreNegocio, setNombreNegocio] = useState(negocio?.nombre_negocio || '');
  const [direccion, setDireccion] = useState(negocio?.direccion || '');
  const [numeroContacto, setNumeroContacto] = useState(negocio?.numero_contacto || '');
  const [emprendedorIds, setEmprendedorIds] = useState([]);

  const fetchEmprendedorIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/emprendedors');
      const jsonData = await response.json();
      const ids = jsonData.map((emprendedor) => emprendedor.id);
      setEmprendedorIds(ids);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEmprendedorIds();
  }, []);

  const handleSave = () => {
    const newNegocio = {
      emprendedor_id: emprendedorId,
      nombre_negocio: nombreNegocio,
      direccion: direccion,
      numero_contacto: numeroContacto,
    };
    onSaveNegocio(newNegocio);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Emprendedor ID</FormLabel>
        <select
          value={emprendedorId}
          onChange={(e) => setEmprendedorId(e.target.value)}
          placeholder="ID del emprendedor"
        >
          {emprendedorIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </FormControl>
      <FormControl>
        <FormLabel>Nombre del Negocio</FormLabel>
        <Input
          value={nombreNegocio}
          onChange={(e) => setNombreNegocio(e.target.value)}
          placeholder="Nombre del negocio"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Dirección</FormLabel>
        <Input
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección del negocio"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Número de Contacto</FormLabel>
        <Input
          value={numeroContacto}
          onChange={(e) => setNumeroContacto(e.target.value)}
          placeholder="Número de contacto"
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave}>
        Guardar
      </Button>
    </Stack>
  );
}
