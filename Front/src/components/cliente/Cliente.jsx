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
import FCliente from '../utils/FCliente';
import SignUp from '../login/SignUp';

export default function Cliente() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'cliente_id' },
      { Header: 'Nombre', accessor: 'nombre_cliente' },
      { Header: 'Cedula', accessor: 'cedula', type: 'number' },
      { Header: 'Numero', accessor: 'numero_personal', type: 'number' },
      { Header: 'Correo', accessor: 'correo_personal', type: 'email' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateCliente(row.original)}>
            Actualizar
          </Button>
          
        ),
      },
    ],
    []
  );

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchClientes();
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
        row.cliente_id &&
        row.nombre_cliente &&
        row.cedula &&
        row.numero_personal &&
        row.correo_personal &&
        (row.cliente_id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre_cliente.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.cedula.toString().includes(filterInput.toLowerCase()) ||
          row.numero_personal.toString().includes(filterInput.toLowerCase()) ||
          row.correo_personal.toLowerCase().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddCliente = () => {
    setShowModal(true);
    setSelectedCliente(null);
  };

  const handleUpdateCliente = async (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleSaveCliente = async (newCliente) => {
    try {
      let url = 'http://localhost:3000/clientes';
      let method = 'POST';
  
      if (selectedCliente) {
        url = 'http://localhost:3000/updatecliente';
        method = 'POST';
      }
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente),
      });
  
      if (response.ok) {
        const updatedCliente = await response.json();
        setData((prevData) => {
          if (selectedCliente) {
            // Update existing cliente in the data array
            const updatedData = prevData.map((cliente) => {
              if (cliente.cliente_id === selectedCliente.cliente_id) {
                return { ...cliente, ...updatedCliente };
              }
              return cliente;
            });
            return updatedData;
          }
          // Add new cliente to the data array
          const newData = [...prevData, updatedCliente];
          return newData;
        });
        setShowModal(false);
      } else {
        const errorData = await response.json();
        // Handle the error response as needed
        console.error(errorData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useFilters, useGlobalFilter);

  return (
    <Stack spacing={4}>
      <Button onClick={handleAddCliente} mb={4}>
        Agregar Cliente
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar cliente"
        mb={4}
      />
      <Table {...getTableProps()} width="100%">
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCliente ? (
              <FCliente onSaveCliente={handleSaveCliente} cliente={selectedCliente} />
            ) : (
              <SignUp onSaveCliente={handleSaveCliente} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
