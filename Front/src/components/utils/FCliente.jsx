import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';

const FCliente = ({ onSaveCliente, cliente }) => {
  const [formData, setFormData] = useState({
    cliente_id: '',
    nombre_cliente: '',
    cedula: '',
    numero_personal: '',
    correo_personal: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        cliente_id: '',
        nombre_cliente: '',
        cedula: '',
        numero_personal: '',
        correo_personal: '',
      });
    }
    setErrors({});
  }, [cliente]);

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
      // Call the onSaveCliente function and pass the formData
      onSaveCliente(formData);
      setFormData({
        cliente_id: '',
        nombre_cliente: '',
        cedula: '',
        numero_personal: '',
        correo_personal: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.nombre_cliente.trim()) {
      validationErrors.nombre_cliente = 'El nombre del cliente es requerido';
    }

    if (!formData.cedula.trim()) {
      validationErrors.cedula = 'La cédula es requerida';
    }

    if (!formData.numero_personal.trim()) {
      validationErrors.numero_personal = 'El número personal es requerido';
    }

    if (!formData.correo_personal.trim()) {
      validationErrors.correo_personal = 'El correo personal es requerido';
    } else if (!isValidEmail(formData.correo_personal)) {
      validationErrors.correo_personal = 'Ingrese un correo válido';
    }

    return validationErrors;
  };

  const isValidEmail = (email) => {
    // Lógica básica de validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="start">
        <FormControl isInvalid={!!errors.nombre_cliente}>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="nombre_cliente"
            value={formData.nombre_cliente}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.nombre_cliente}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.cedula}>
          <FormLabel>Cédula</FormLabel>
          <Input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.cedula}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.numero_personal}>
          <FormLabel>Número</FormLabel>
          <Input
            type="text"
            name="numero_personal"
            value={formData.numero_personal}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.numero_personal}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.correo_personal}>
          <FormLabel>Correo</FormLabel>
          <Input
            type="email"
            name="correo_personal"
            value={formData.correo_personal}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.correo_personal}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          {cliente ? 'Actualizar' : 'Guardar'}
        </Button>
      </VStack>
    </form>
  );
};

export default FCliente;
