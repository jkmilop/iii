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

const SignUp = () => {
  const [formData, setFormData] = useState({
    cliente_id: '',
    nombre_cliente: '',
    cedula: '',
    numero_personal: '',
    correo_personal: '',
    contrasena: '',
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
      // Enviar el formulario o realizar acciones adicionales
      console.log('Formulario enviado:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.cliente_id.trim()) {
      validationErrors.cliente_id = 'ID del cliente es requerido';
    }

    if (!formData.nombre_cliente.trim()) {
      validationErrors.nombre_cliente = 'Nombre del cliente es requerido';
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

    if (!formData.contrasena.trim()) {
      validationErrors.contrasena = 'Contraseña es requerida';
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
        <FormControl isInvalid={!!errors.cliente_id}>
          <FormLabel>ID</FormLabel>
          <Input
            type="text"
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.cliente_id}</FormErrorMessage>
        </FormControl>

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

        <FormControl isInvalid={!!errors.contrasena}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{errors.contrasena}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Registrarme
        </Button>
      </VStack>

      <Text className="forgot-password text-right" mt={4}>
        ¿Ya tienes una cuenta? <Link href="/sign-in">Inicia sesión</Link>
      </Text>
    </form>
  );
};

export default SignUp;
