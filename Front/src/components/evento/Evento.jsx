import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack } from '@chakra-ui/react';
import FEvento from '../utils/FEveneto';

export default function Evento() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'evento_id' },
      { Header: 'Negocio ID', accessor: 'negocio_id' },
      { Header: 'Fecha y Hora', accessor: 'fecha_hora' },
      { Header: 'Nombre del Evento', accessor: 'nombre_evento' },
    ],
    []
  );

  const fetchEventos = async () => {
    try {
      const response = await fetch('http://localhost:3000/eventos');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setFilterInput(value);
  };

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((row) => {
      return (
        row.evento_id &&
        row.negocio_id &&
        row.fecha_hora &&
        row.nombre_evento &&
        (row.evento_id.toString().includes(filterInput.toLowerCase()) ||
          row.negocio_id.toString().includes(filterInput.toLowerCase()) ||
          row.fecha_hora.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.nombre_evento.toLowerCase().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddEvento = () => {
    setShowModal(true);
    setSelectedEvento(null);
  };

  const handleSaveEvento = async (newEvento) => {
    try {
      let url = 'http://localhost:3000/eventos';
      let method = 'POST';

      if (selectedEvento) {
        url = 'http://localhost:3000/updateevento';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvento),
      });

      if (response.ok) {
        const updatedEvento = await response.json();
        setData((prevData) => {
          if (selectedEvento) {
            // Update existing evento in the data array
            return prevData.map((evento) => {
              if (evento.evento_id === updatedEvento.evento_id) {
                return updatedEvento;
              }
              return evento;
            });
          } else {
            // Add new evento to the data array
            return [...prevData, updatedEvento];
          }
        });
        setShowModal(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvento(null);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredData,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <Stack spacing={4}>
        <Input
          placeholder="Buscar..."
          value={filterInput}
          onChange={handleFilterChange}
          mb={4}
          maxWidth="md"
        />
        <Button colorScheme="teal" onClick={handleAddEvento}>
          Agregar Evento
        </Button>
        <Table {...getTableProps()} variant="striped" size="sm">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Stack>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvento ? 'Actualizar Evento' : 'Agregar Evento'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FEvento onSaveEvento={handleSaveEvento} evento={selectedEvento} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
