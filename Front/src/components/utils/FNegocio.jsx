import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';

const FNegocio = ({ onSaveNegocio }) => {
  const [formData, setFormData] = useState({
    nombre_negocio: '',
    direccion: '',
    numero_contacto: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Call the onSaveNegocio function and pass the formData
      onSaveNegocio(formData);
      setFormData({
        nombre_negocio: '',
        direccion: '',
        numero_contacto: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };
  
  const validateForm = () => {
    let validationErrors = {};

    if (!formData.nombre_negocio.trim()) {
      validationErrors.nombre_negocio = 'Nombre del negocio es requerido';
    }

    if (!formData.direccion.trim()) {
      validationErrors.direccion = 'Dirección es requerida';
    }

    if (!formData.numero_contacto.trim()) {
      validationErrors.numero_contacto = 'Número de contacto es requerido';
    }

    return validationErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="start">
        <FormControl isInvalid={!!errors.nombre_negocio}>
          <FormLabel>Nombre del Negocio</FormLabel>
          <Input
            type="text"
            name="nombre_negocio"
            value={formData.nombre_negocio}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.nombre_negocio}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.direccion}>
          <FormLabel>Dirección</FormLabel>
          <Input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.direccion}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.numero_contacto}>
          <FormLabel>Número de Contacto</FormLabel>
          <Input
            type="text"
            name="numero_contacto"
            value={formData.numero_contacto}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.numero_contacto}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Guardar
        </Button>
      </VStack>
    </form>
  );
};

export default FNegocio;
