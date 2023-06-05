import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Emprendedor from './Emprendedor';

describe('Emprendedor', () => {
  it('se renderiza sin errores', () => {
    render(<Emprendedor />);
  });

  it('muestra los datos de los emprendedores en la tabla', () => {
    const { getByText } = render(<Emprendedor />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Nombre')).toBeInTheDocument();
    expect(getByText('Cedula')).toBeInTheDocument();
    expect(getByText('Numero')).toBeInTheDocument();
    expect(getByText('Correo')).toBeInTheDocument();
    expect(getByText('Acciones')).toBeInTheDocument();
  });

  it('filtra los datos de la tabla en función del valor del input', () => {
    const { getByPlaceholderText, getByText } = render(<Emprendedor />);
    const input = getByPlaceholderText('Buscar emprendedor');
    fireEvent.change(input, { target: { value: 'emprendedor1' } });
    expect(getByText('emprendedor1')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en el botón "Agregar Emprendedor"', () => {
    const { getByText, getByRole } = render(<Emprendedor />);
    const addButton = getByText('Agregar Emprendedor');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('guarda un nuevo emprendedor al hacer clic en el botón "Guardar" en el modal', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la creación exitosa del emprendedor
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ emprendedor_id: 1, nombre_emprendedor: 'Nuevo Emprendedor' }),
      })
    );

    const { getByText, getByLabelText } = render(<Emprendedor />);
    const addButton = getByText('Agregar Emprendedor');
    fireEvent.click(addButton);

    // Rellena los campos del formulario en el modal
    const emprendedorNameInput = getByLabelText('Nombre del Emprendedor');
    fireEvent.change(emprendedorNameInput, { target: { value: 'Nuevo Emprendedor' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el nuevo emprendedor se muestre en la tabla
    expect(getByText('Nuevo Emprendedor')).toBeInTheDocument();
  });

  it('actualiza un emprendedor existente al hacer clic en el botón "Actualizar" en la fila de la tabla', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la actualización exitosa del emprendedor
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ emprendedor_id: 1, nombre_emprendedor: 'Emprendedor Actualizado' }),
      })
    );

    const { getByText, getAllByText } = render(<Emprendedor />);
    const updateButton = getAllByText('Actualizar')[0];
    fireEvent.click(updateButton);

    // Verifica que el emprendedor seleccionado se muestre en el modal
    expect(getByText('Emprendedor Actualizado')).toBeInTheDocument();

    // Rellena los campos del formulario en el modal
    const emprendedorNameInput = getByText('Emprendedor Actualizado').previousSibling;
    fireEvent.change(emprendedorNameInput, { target: { value: 'Emprendedor Modificado' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el emprendedor actualizado se muestre en la tabla
    expect(getByText('Emprendedor Modificado')).toBeInTheDocument();
  });
});
