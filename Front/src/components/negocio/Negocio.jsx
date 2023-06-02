import React, { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input } from '@chakra-ui/react';

export default function Negocio() {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'negocio_id' },
      { Header: 'Emprendedor ID', accessor: 'emprendedor_id' },
      { Header: 'Nombre', accessor: 'nombre_negocio' },
      { Header: 'Dirección', accessor: 'direccion' },
      { Header: 'Número de Contacto', accessor: 'numero_contacto' },
      { Header: 'Acciones', accessor: 'actions', Cell: ({ row }) => (
        <>
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateNegocio(row.original)}>Actualizar</Button>
        </>
      )},
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

  const handleUpdateNegocio = (negocio) => {
    // Implement the logic for updating a negocio
  };

  const handleAddNegocio = async () => {
    const newNegocio = {
      // Provide the necessary properties for the new negocio
    };

    try {
      const response = await fetch('http://localhost:3000/negocio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNegocio)
      });

      if (response.ok) {
        const responseData = await response.json();
        setData((prevData) => [...prevData, responseData]);
      } else {
        const errorData = await response.json();
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
    setFilter
  } = useTable({ columns, data }, useFilters);

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setFilter('nombre_negocio', value);
    setFilterValue(value);
  };

  return (
    <>
      <Input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Buscar negocio"
        mb={4}
      />
      <Button onClick={handleAddNegocio} mb={4}>
        Agregar Negocio
      </Button>
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
