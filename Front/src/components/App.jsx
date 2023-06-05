import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box, Flex, Text, Link as ChakraLink, Stack } from '@chakra-ui/react';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Cliente from './cliente/Cliente';
import Negocio from './negocio/Negocio';
import Emprendedor from './emprendedor/Emprendedor';
import ReservarSillas from './reserva/ReservarSillas';
import Evento from './evento/Evento';
import Producto from './producto/Producto';

function Navbar() {
  return (
    <Flex align="center" justify="space-between" p={4} bg="gray.100">
      <Text fontSize="lg" fontWeight="bold">
        par tragos
      </Text>
      <Stack direction="row" spacing={4}>
        <Link to="/inciar-sesion" as={ChakraLink}>
          Iniciar Sesión
        </Link>
        <Link to="/registro" as={ChakraLink}>
          Registrarse
        </Link>
        <Link to="/clientes" as={ChakraLink}>
          Clientes
        </Link>
        <Link to="/negocios" as={ChakraLink}>
          Negocios
        </Link>
        <Link to="/emprendedores" as={ChakraLink}>
          Emprendedores
        </Link>
        <Link to="/reserva" as={ChakraLink}>
          Reservar Sillas
        </Link>
        <Link to="/eventos" as={ChakraLink}>
          Eventos
        </Link>
        <Link to="/productos" as={ChakraLink}>
          Productos
        </Link>

      </Stack>
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <>
          <Navbar />
          <Box p={8}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/inciar-sesion" element={<Login />} />
              <Route path="/registro" element={<SignUp />} />
              <Route path="/clientes" element={<Cliente />} />
              <Route path="/negocios" element={<Negocio />} />
              <Route path="/emprendedores" element={<Emprendedor />} />
              <Route path="/reserva" element={<ReservarSillas />} />
              <Route path="/eventos" element={<Evento />} />
              <Route path="/productos" element={<Producto />} />


            </Routes>
          </Box>
        </>
      </Router>
    </ChakraProvider>
  );
}

export default App;
