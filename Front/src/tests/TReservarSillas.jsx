import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ReservarSillas from './ReservarSillas';

describe('ReservarSillas', () => {
  it('se renderiza sin errores', () => {
    render(<ReservarSillas />);
  });

  it('selecciona y reserva sillas correctamente', () => {
    const { getByText, getAllByRole } = render(<ReservarSillas />);
    const sillas = getAllByRole('button');
    const reservarButton = getByText('Reservar');

    fireEvent.click(sillas[0]);

    // Verifica que la primera silla esté seleccionada
    expect(sillas[0]).toHaveStyle('background-color: gray.400');

    // Verifica que el botón de reservar esté habilitado
    expect(reservarButton).toBeEnabled();

    fireEvent.click(reservarButton);

    // Verifica que se muestre el modal de confirmación
    const modal = getByText('Desea reservar las sillas seleccionadas?');
    expect(modal).toBeInTheDocument();

    const cancelarButton = getByText('Cancelar');
    const confirmarButton = getByText('Reservar');

    fireEvent.click(cancelarButton);

    // Verifica que el modal se cierre al hacer clic en el botón Cancelar
    expect(modal).not.toBeInTheDocument();

    fireEvent.click(reservarButton);
    fireEvent.click(confirmarButton);

    // Espera a que se resuelva la reserva (puedes usar una función simulada/mock para simular la reserva)

    // Verifica que el modal se cierre al hacer clic en el botón Reservar
    expect(modal).not.toBeInTheDocument();

    // Verifica que la primera silla esté marcada como reservada (roja)
    expect(sillas[0]).toHaveStyle('background-color: red');
  });
});
