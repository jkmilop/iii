import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Evento from './Evento';

describe('Evento', () => {
  it('se renderiza sin errores', () => {
    render(<Evento />);
  });

  it('muestra los datos de los eventos en la tabla', () => {
    const { getByText } = render(<Evento />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Negocio ID')).toBeInTheDocument();
    expect(getByText('Fecha y Hora')).toBeInTheDocument();
    expect(getByText('Nombre del Evento')).toBeInTheDocument();
  });

  it('filtra los datos de la tabla en función del valor del input', () => {
    const { getByPlaceholderText, getByText } = render(<Evento />);
    const input = getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'evento1' } });
    expect(getByText('evento1')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en el botón "Agregar Evento"', () => {
    const { getByText, getByRole } = render(<Evento />);
    const addButton = getByText('Agregar Evento');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('guarda un nuevo evento al hacer clic en el botón "Guardar" en el modal', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la creación exitosa del evento
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ evento_id: 1, nombre_evento: 'Nuevo Evento' }),
      })
    );

    const { getByText, getByLabelText } = render(<Evento />);
    const addButton = getByText('Agregar Evento');
    fireEvent.click(addButton);

    // Rellena los campos del formulario en el modal
    const eventoNameInput = getByLabelText('Nombre del Evento');
    fireEvent.change(eventoNameInput, { target: { value: 'Nuevo Evento' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el nuevo evento se muestre en la tabla
    expect(getByText('Nuevo Evento')).toBeInTheDocument();
  });

  it('actualiza un evento existente al hacer clic en el botón "Actualizar" en la fila de la tabla', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la actualización exitosa del evento
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ evento_id: 1, nombre_evento: 'Evento Actualizado' }),
      })
    );

    const { getByText, getAllByText } = render(<Evento />);
    const updateButton = getAllByText('Actualizar')[0];
    fireEvent.click(updateButton);

    // Verifica que el evento seleccionado se muestre en el modal
    expect(getByText('Evento Actualizado')).toBeInTheDocument();

    // Rellena los campos del formulario en el modal
    const eventoNameInput = getByText('Evento Actualizado').previousSibling;
    fireEvent.change(eventoNameInput, { target: { value: 'Evento Modificado' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el evento actualizado se muestre en la tabla
    expect(getByText('Evento Modificado')).toBeInTheDocument();
  });
});
