import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import FCliente from '../utils/FCliente';

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
      { Header: 'Acciones', accessor: 'actions', Cell: ({ row }) => (
        <>
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateCliente(row.original)}>Actualizar</Button>
        </>
      )},
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

  const handleSaveCliente = async (newCliente) => {
    try {
      const response = await fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente)
      });

      if (response.ok) {
        const token = await response.json();
        // Process the token or perform any necessary actions
        console.log(token);
        setData((prevData) => [...prevData, newCliente]);
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

  const handleUpdateCliente = (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useFilters, useGlobalFilter);

  return (
    <>
      <Button onClick={handleAddCliente} mb={4}>
        Agregar Cliente
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FCliente
              onSaveCliente={(newCliente) => handleSaveCliente(newCliente)}
              cliente={selectedCliente}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar estudiante"
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
    </>
  );
}
