import React, { useState } from 'react';
import { Box, Grid, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';

export default function ReservarSillas() {
  const [sillas, setSillas] = useState(Array(10).fill(Array(10).fill(false)));
  const [showButton, setShowButton] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [valor, setValor] = useState(50000);

  const toggleSilla = (fila, columna) => {
    const isSelected = sillas[fila][columna];

    if (isSelected) {
      return;
    }

    setSillas((prevSillas) => {
      const newSillas = prevSillas.map((filaSillas, rowIndex) =>
        filaSillas.map((silla, columnIndex) =>
          rowIndex === fila && columnIndex === columna ? true : silla
        )
      );
      return newSillas;
    });

    if (!showButton) {
      setShowButton(true);
    }

    setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, { fila, columna }]);
  };

  const renderSillas = () => {
    return sillas.map((fila, rowIndex) => (
      <Grid key={rowIndex} templateColumns="repeat(10, 1fr)" gap={2}>
        {fila.map((silla, columnIndex) => (
          <Box
            key={columnIndex}
            w="40px"
            h="40px"
            bg={silla ? 'green.400' : selectedBoxes.find((box) => box.fila === rowIndex && box.columna === columnIndex) ? 'gray.400' : 'gray.200'}
            onClick={() => toggleSilla(rowIndex, columnIndex)}
            cursor={silla || selectedBoxes.find((box) => box.fila === rowIndex && box.columna === columnIndex) ? 'not-allowed' : 'pointer'}
            _hover={{ bg: silla ? 'green.300' : 'gray.300' }}
          ></Box>
        ))}
      </Grid>
    ));
  };

  const handleReservar = () => {
    setSelectedBoxes([]);
    setShowButton(false);
    setShowModal(true);
    setSillas((prevSillas) => {
      const newSillas = [...prevSillas];
      selectedBoxes.forEach((box) => {
        newSillas[box.fila][box.columna] = 'red';
      });
      return newSillas;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalValor = valor * selectedBoxes.length;

  const formatSelectedBoxes = selectedBoxes.map((box) => `[Fila: ${box.fila}, Columna: ${box.columna}]`);

  return (
    <Box textAlign="center" p={4}>
      <h1>Reservar Sillas</h1>
      <Grid templateColumns="repeat(1, 1fr)" gap={2} mt={4}>
        {renderSillas()}
      </Grid>
      {showButton && (
        <div>
          <Button mt={4} onClick={handleReservar}>
            Reservar
          </Button>
        </div>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Desea reservar las sillas seleccionadas?</p>
            <p>Sillas: {formatSelectedBoxes.join(', ')}</p>
            <p>Valor: {totalValor}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Reservar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
