import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cliente from './Cliente';

describe('Cliente', () => {
  it('se renderiza sin errores', () => {
    render(<Cliente />);
  });

  it('muestra los datos de los clientes en la tabla', () => {
    const { getByText } = render(<Cliente />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Nombre')).toBeInTheDocument();
    expect(getByText('Cedula')).toBeInTheDocument();
    expect(getByText('Numero')).toBeInTheDocument();
    expect(getByText('Correo')).toBeInTheDocument();
    expect(getByText('Acciones')).toBeInTheDocument();
  });

  it('filtra los datos de la tabla en función del valor del input', () => {
    const { getByPlaceholderText, getByText } = render(<Cliente />);
    const input = getByPlaceholderText('Buscar cliente');
    fireEvent.change(input, { target: { value: 'cliente1' } });
    expect(getByText('cliente1')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en el botón "Agregar Cliente"', () => {
    const { getByText, getByRole } = render(<Cliente />);
    const addButton = getByText('Agregar Cliente');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('guarda un nuevo cliente al hacer clic en el botón "Guardar" en el modal', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la creación exitosa del cliente
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ cliente_id: 1, nombre_cliente: 'Nuevo Cliente' }),
      })
    );

    const { getByText, getByLabelText } = render(<Cliente />);
    const addButton = getByText('Agregar Cliente');
    fireEvent.click(addButton);

    // Rellena los campos del formulario en el modal
    const clientNameInput = getByLabelText('Nombre del Cliente');
    fireEvent.change(clientNameInput, { target: { value: 'Nuevo Cliente' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el nuevo cliente se muestre en la tabla
    expect(getByText('Nuevo Cliente')).toBeInTheDocument();
  });

  it('actualiza un cliente existente al hacer clic en el botón "Actualizar" en la fila de la tabla', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la actualización exitosa del cliente
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ cliente_id: 1, nombre_cliente: 'Cliente Actualizado' }),
      })
    );

    const { getByText, getAllByText } = render(<Cliente />);
    const updateButton = getAllByText('Actualizar')[0];
    fireEvent.click(updateButton);

    // Verifica que el cliente seleccionado se muestre en el modal
    expect(getByText('Cliente Actualizado')).toBeInTheDocument();

    // Rellena los campos del formulario en el modal
    const clientNameInput = getByText('Cliente Actualizado').previousSibling;
    fireEvent.change(clientNameInput, { target: { value: 'Cliente Modificado' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el cliente se haya actualizado en la tabla
    expect(getByText('Cliente Modificado')).toBeInTheDocument();
  });
});
