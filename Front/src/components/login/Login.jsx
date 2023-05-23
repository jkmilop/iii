import React from 'react';
import { FormControl, FormLabel, Input, Checkbox, Button, Text, Link } from '@chakra-ui/react';

export default function Login() {
  return (
    <form>
      <FormControl mb={3}>
        <FormLabel>Correo</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Contraseña</FormLabel>
        <Input type="password" />
      </FormControl>
      <FormControl mb={3}>
        <Checkbox id="customCheck1" colorScheme="blue">
          Recuérdame
        </Checkbox>
      </FormControl>
      <Button colorScheme="blue" size="lg" mt={4} mb={3}>
        Ingresar
      </Button>
      <Text textAlign="right">
        Aún no tienes una cuenta? <Link href="/sign-up">Regístrate</Link>
      </Text>
    </form>
  );
}
