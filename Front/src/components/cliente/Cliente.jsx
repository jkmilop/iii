import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Input, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SignUp from '../login/SignUp';

export default function Cliente() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'cliente_id' },
      { Header: 'Nombre', accessor: 'nombre_cliente' },
      { Header: 'Cedula', accessor: 'cedula', type: 'number' },
      { Header: 'Numero', accessor: 'numero_personal', type: 'number' },
      { Header: 'Correo', accessor: 'correo_personal', type: 'email' },
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
    return data.filter((row) => {
      return (
        row.cliente_id.toString().includes(filterInput.toLowerCase()) ||
        row.nombre_cliente.toLowerCase().includes(filterInput.toLowerCase()) ||
        row.cedula.toString().includes(filterInput.toLowerCase()) ||
        row.numero_personal.toString().includes(filterInput.toLowerCase()) ||
        row.correo_personal.toLowerCase().includes(filterInput.toLowerCase())
      );
    });
  }, [data, filterInput]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useFilters, useGlobalFilter);

  const handleAddCliente = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar en todos los campos..."
        mb={4}
      />

      <IconButton
        icon={<AddIcon />}
        aria-label="Agregar Cliente"
        colorScheme="blue"
        onClick={handleAddCliente}
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

      {showSignUp && <SignUp onClose={handleCloseSignUp} />}
    </>
  );
}
