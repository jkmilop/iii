import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Negocio from './Negocio';

describe('Negocio', () => {
  it('se renderiza sin errores', () => {
    render(<Negocio />);
  });

  it('muestra los datos de los negocios en la tabla', () => {
    const { getByText } = render(<Negocio />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Nombre')).toBeInTheDocument();
    expect(getByText('Dirección')).toBeInTheDocument();
    expect(getByText('Número de Contacto')).toBeInTheDocument();
  });

  it('filtra los datos de la tabla en función del valor del input', () => {
    const { getByPlaceholderText, getByText } = render(<Negocio />);
    const input = getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'negocio1' } });
    expect(getByText('negocio1')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en el botón "Agregar Negocio"', () => {
    const { getByText, getByRole } = render(<Negocio />);
    const addButton = getByText('Agregar Negocio');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('guarda un nuevo negocio al hacer clic en el botón "Guardar" en el modal', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la creación exitosa del negocio
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ negocio_id: 1, nombre_negocio: 'Nuevo Negocio' }),
      })
    );

    const { getByText, getByLabelText } = render(<Negocio />);
    const addButton = getByText('Agregar Negocio');
    fireEvent.click(addButton);

    // Rellena los campos del formulario en el modal
    const negocioNameInput = getByLabelText('Nombre del Negocio');
    fireEvent.change(negocioNameInput, { target: { value: 'Nuevo Negocio' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el nuevo negocio se muestre en la tabla
    expect(getByText('Nuevo Negocio')).toBeInTheDocument();
  });

  it('actualiza un negocio existente al hacer clic en el botón "Actualizar" en la fila de la tabla', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la actualización exitosa del negocio
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ negocio_id: 1, nombre_negocio: 'Negocio Actualizado' }),
      })
    );

    const { getByText, getAllByText } = render(<Negocio />);
    const updateButton = getAllByText('Actualizar')[0];
    fireEvent.click(updateButton);

    // Verifica que el negocio seleccionado se muestre en el modal
    expect(getByText('Negocio Actualizado')).toBeInTheDocument();

    // Rellena los campos del formulario en el modal
    const negocioNameInput = getByText('Negocio Actualizado').previousSibling;
    fireEvent.change(negocioNameInput, { target: { value: 'Negocio Modificado' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el negocio actualizado se muestre en la tabla
    expect(getByText('Negocio Modificado')).toBeInTheDocument();
  });
});
