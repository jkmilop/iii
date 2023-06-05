import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';

const FEmprendedor = ({ onSaveEmprendedor, emprendedor }) => {
  const [formData, setFormData] = useState({
    emprendedor_id: '',
    nombre_emprendedor: '',
    cedula: '',
    numero_personal: '',
    correo_personal: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (emprendedor) {
      setFormData(emprendedor);
    } else {
      setFormData({
        emprendedor_id: '',
        nombre_emprendedor: '',
        cedula: '',
        numero_personal: '',
        correo_personal: '',
      });
    }
    setErrors({});
  }, [emprendedor]);

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
      // Call the onSaveEmprendedor function and pass the formData
      onSaveEmprendedor(formData);
      setFormData({
        emprendedor_id: '',
        nombre_emprendedor: '',
        cedula: '',
        numero_personal: '',
        correo_personal: '',
      });
      setErrors({});
      onCloseModal();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.nombre_emprendedor.trim()) {
      validationErrors.nombre_emprendedor = 'El nombre del emprendedor es requerido';
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
    // Basic email validation logic
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

        <Button type="submit" colorScheme="blue">
          {emprendedor ? 'Actualizar' : 'Guardar'}
        </Button>
      </VStack>
    </form>
  );
};

export default FEmprendedor;
