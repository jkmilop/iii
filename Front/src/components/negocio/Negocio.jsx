import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import FNegocio from '../utils/FNegocio';

export default function Negocio() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNegocio, setSelectedNegocio] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'negocio_id' },
      { Header: 'Nombre', accessor: 'nombre_negocio' },
      { Header: 'Dirección', accessor: 'direccion' },
      { Header: 'Número de Contacto', accessor: 'numero_contacto' },
    ],
    []
  );

  const fetchNegocios = async () => {
    try {
      const response = await fetch('http://localhost:3000/negocios');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchNegocios();
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
        row.negocio_id &&
        row.nombre_negocio &&
        row.direccion &&
        row.numero_contacto &&
        (row.negocio_id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre_negocio.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.direccion.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.numero_contacto.toString().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddNegocio = () => {
    setShowModal(true);
    setSelectedNegocio(null);
  };

  const handleSaveNegocio = async (newNegocio) => {
    try {
      let url = 'http://localhost:3000/negocio';
      let method = 'POST';

      if (selectedNegocio) {
        url = 'http://localhost:3000/updatenegocio';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNegocio),
      });

      if (response.ok) {
        const updatedNegocio = await response.json();
        setData((prevData) => {
          if (selectedNegocio) {
            // Update existing negocio in the data array
            return prevData.map((negocio) => {
              if (negocio.negocio_id === updatedNegocio.negocio_id) {
                return updatedNegocio;
              }
              return negocio;
            });
          } else {
            // Add new negocio to the data array
            return [...prevData, updatedNegocio];
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
    setSelectedNegocio(null);
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
        <Button colorScheme="teal" onClick={handleAddNegocio}>
          Agregar Negocio
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
          <ModalHeader>{selectedNegocio ? 'Actualizar Negocio' : 'Agregar Negocio'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FNegocio onSaveNegocio={handleSaveNegocio} negocio={selectedNegocio} />
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
