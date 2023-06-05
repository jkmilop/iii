import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';

export default function FProducto({ onSaveProducto, producto }) {
  const [negocioId, setNegocioId] = useState(producto?.negocio_id || '');
  const [nombreProducto, setNombreProducto] = useState(producto?.nombre_producto || '');
  const [valor, setValor] = useState(producto?.valor || '');
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
    const newProducto = {
      negocio_id: negocioId,
      nombre_producto: nombreProducto,
      valor: valor,
    };
    onSaveProducto(newProducto);
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
        <FormLabel>Nombre del Producto</FormLabel>
        <Input
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
          placeholder="Nombre del producto"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Valor</FormLabel>
        <Input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor del producto"
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave}>
        Guardar
      </Button>
    </Stack>
  );
}
