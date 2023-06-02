import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Checkbox, Button, Text, Link } from '@chakra-ui/react';

export default function Login() {
  const [correo_personal, setCorreo] = useState('');
  const [password, setContra] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_personal: correo_personal, password }),
      });

      if (response.ok) {
        const token = await response.json();

        // Do something with the token (e.g., save it to localStorage or state)

        // Redirect or perform any other action
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display error message)
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:3000/is-verify');

      if (response.ok) {
        const isValid = await response.json();

        // Do something with the validation result
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form>
      <FormControl mb={3}>
        <FormLabel>Correo</FormLabel>
        <Input type="correo_personal" value={correo_personal} onChange={(e) => setCorreo(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Contraseña</FormLabel>
        <Input type="password" value={password} onChange={(e) => setContra(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <Checkbox id="customCheck1" colorScheme="blue">
          Recuérdame
        </Checkbox>
      </FormControl>
      <Button colorScheme="blue" size="lg" mt={4} mb={3} onClick={handleLogin}>
        Ingresar
      </Button>
      <Text textAlign="right">
        Aún no tienes una cuenta? <Link href="/sign-up">Regístrate</Link>
      </Text>
    </form>
  );
}
