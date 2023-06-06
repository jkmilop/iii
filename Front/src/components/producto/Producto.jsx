import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack } from '@chakra-ui/react';
import FProducto from '../utils/FProducto';


export default function Producto() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'producto_id' },
      { Header: 'Negocio ID', accessor: 'negocio_id' },
      { Header: 'Nombre del Producto', accessor: 'nombre_producto' },
      { Header: 'Valor', accessor: 'valor' },
    ],
    []
  );

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/productos');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProductos();
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
        row.producto_id &&
        row.negocio_id &&
        row.nombre_producto &&
        row.valor &&
        (row.producto_id.toString().includes(filterInput.toLowerCase()) ||
          row.negocio_id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre_producto.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.valor.toString().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddProducto = () => {
    setShowModal(true);
    setSelectedProducto(null);
  };

  const handleSaveProducto = async (newProducto) => {
    try {
      let url = 'http://localhost:3000/producto';
      let method = 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProducto),
      });

      if (response.ok) {
        const updatedProducto = await response.json();
        setData((prevData) => {
          if (selectedProducto) {
            // Update existing producto in the data array
            return prevData.map((producto) => {
              if (producto.producto_id === updatedProducto.producto_id) {
                return updatedProducto;
              }
              return producto;
            });
          } else {
            // Add new producto to the data array
            return [...prevData, updatedProducto];
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
    setSelectedProducto(null);
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
        <Button colorScheme="teal" onClick={handleAddProducto}>
          Agregar Producto
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
          <ModalHeader>
            {selectedProducto ? 'Actualizar Producto' : 'Agregar Producto'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FProducto onSaveProducto={handleSaveProducto} producto={selectedProducto} />
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
