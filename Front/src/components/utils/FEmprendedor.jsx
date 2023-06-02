import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const FEmprendedor = ({ onSaveEmprendedor }) => {
  const [nombreEmprendedor, setNombreEmprendedor] = useState(emprendedor?.nombre_emprendedor || '');
  const [cedula, setCedula] = useState(emprendedor?.cedula || '');
  const [numeroContacto, setNumeroContacto] = useState(emprendedor?.numero_contacto || '');

  const handleSave = () => {
    const newEmprendedor = {
      nombre_emprendedor: nombreEmprendedor,
      cedula: cedula,
      numero_contacto: numeroContacto
    };

    onSaveEmprendedor(newEmprendedor);
    setNombreEmprendedor('');
    setCedula('');
    setNumeroContacto('');
  };

  return (
    <>
      <FormControl>
        <FormLabel>Nombre del Emprendedor</FormLabel>
        <Input
          type="text"
          value={nombreEmprendedor}
          onChange={(e) => setNombreEmprendedor(e.target.value)}
          placeholder="Ingrese el nombre del emprendedor"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cédula del Emprendedor</FormLabel>
        <Input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Ingrese la cédula del emprendedor"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Número de Contacto</FormLabel>
        <Input
          type="text"
          value={numeroContacto}
          onChange={(e) => setNumeroContacto(e.target.value)}
          placeholder="Ingrese el número de contacto del emprendedor"
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleSave}>
        Guardar
      </Button>
    </>
  );
}
export default FEmprendedor;