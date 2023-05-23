import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function Emprendedor() {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'emprendedor_id' },
      { Header: 'Nombre', accessor: 'nombre_emprendedor' },
      { Header: 'Cedula', accessor: 'cedula', type: 'number' },
      { Header: 'Numero', accessor: 'numero_personal', type: 'number' },
      { Header: 'Correo', accessor: 'correo_personal', type: 'email' },
    ],
    []
  );

  const fetchEmprendedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/emprendedores');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEmprendedores();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
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
  );
}
