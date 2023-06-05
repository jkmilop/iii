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

export default function Emprendedor() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmprendedor, setSelectedEmprendedor] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'emprendedor_id' },
      { Header: 'Nombre', accessor: 'nombre_emprendedor' },
      { Header: 'Cedula', accessor: 'cedula', type: 'number' },
      { Header: 'Numero', accessor: 'numero_personal', type: 'number' },
      { Header: 'Correo', accessor: 'correo_personal', type: 'email' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateEmprendedor(row.original)}>
            Actualizar
          </Button>
        ),
      },
    ],
    []
  );

  const fetchEmprendedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/emprendedors');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEmprendedores();
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
        row.emprendedor_id &&
        row.nombre_emprendedor &&
        row.cedula &&
        row.numero_personal &&
        row.correo_personal &&
        (row.emprendedor_id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre_emprendedor.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.cedula.toString().includes(filterInput.toLowerCase()) ||
          row.numero_personal.toString().includes(filterInput.toLowerCase()) ||
          row.correo_personal.toLowerCase().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddEmprendedor = () => {
    setShowModal(true);
    setSelectedEmprendedor(null);
  };

  const handleUpdateEmprendedor = async (emprendedor) => {
    setSelectedEmprendedor(emprendedor);
    setShowModal(true);
  };

  const handleSaveEmprendedor = async (newEmprendedor) => {
    try {
      let url = 'http://localhost:3000/emprendedor';
      let method = 'POST';

      if (selectedEmprendedor) {
        url = 'http://localhost:3000/updateemprendedor';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmprendedor),
      });

      if (response.ok) {
        const updatedEmprendedor = await response.json();
        setData((prevData) => {
          if (selectedEmprendedor) {
            // Update existing emprendedor in the data array
            return prevData.map((emprendedor) => {
              if (emprendedor.emprendedor_id === selectedEmprendedor.emprendedor_id) {
                return { ...emprendedor, ...updatedEmprendedor };
              }
              return emprendedor;
            });
          }
          // Add new emprendedor to the data array
          return [...prevData, updatedEmprendedor];
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
      <Button onClick={handleAddEmprendedor} mb={4}>
        Agregar Emprendedor
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar emprendedor"
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
            {selectedEmprendedor ? (
              <FCliente onSaveCliente={handleSaveEmprendedor} cliente={selectedEmprendedor} />
            ) : (
              <SignUp onSaveCliente={handleSaveEmprendedor} />
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
