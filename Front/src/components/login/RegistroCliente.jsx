import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  VStack,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';

const RegistroCliente = ({ onSaveCliente }) => {
  const [formData, setFormData] = useState({
    nombre_emprendedor: '',
    password: '',
    cedula: '',
    numero_personal: '',
    correo_personal: '',
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
      // Call the onSaveCliente function and pass the formData
      onSaveCliente(formData);
      setFormData({
        nombre_emprendedor: '',
        password: '',
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


    if (!formData.nombre_emprendedor.trim()) {
      validationErrors.nombre_emprendedor = 'Nombre del cliente es requerido';
    }

    if (!formData.cedula.trim()) {
      validationErrors.cedula = 'Cedula es requerida';
    }

    if (!formData.numero_personal.trim()) {
      validationErrors.numero_personal = 'Número personal es requerido';
    }

    if (!formData.correo_personal.trim()) {
      validationErrors.correo_personal = 'Correo personal es requerido';
    } else if (!isValidEmail(formData.correo_personal)) {
      validationErrors.correo_personal = 'Ingrese un correo válido';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Contraseña es requerida';
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
        <FormControl isInvalid={!!errors.nombre_emprendedor}>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="nombre_emprendedor"
            value={formData.nombre_emprendedor}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.nombre_emprendedor}</FormErrorMessage>
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

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Registrarme
        </Button>
      </VStack>

    </form>
  );
};

export default RegistroCliente;