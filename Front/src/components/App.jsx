import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Cliente from './cliente/Cliente';
import Negocio from './negocio/Negocio';

function Navbar() {
  return (
    <Flex align="center" justify="space-between" p={4} bg="gray.100">
      <Text fontSize="lg" fontWeight="bold">
        par tragos
      </Text>
      <Flex>
        <Link to="/sign-in" as={ChakraLink} mr={4}>
          Iniciar Sesión
        </Link>
      </Flex>
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
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/clientes" element={<Cliente />} />
              <Route path="/negocio" element={<Negocio />} />

            </Routes>
          </Box>
        </>
      </Router>
    </ChakraProvider>
  );
}

export default App;
