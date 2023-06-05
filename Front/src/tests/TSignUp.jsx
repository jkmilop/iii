import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp', () => {
  it('se renderiza sin errores', () => {
    render(<SignUp />);
  });

  it('actualiza el estado al escribir en los campos', () => {
    const { getByLabelText } = render(<SignUp />);
    const nombreInput = getByLabelText('Nombre');
    const cedulaInput = getByLabelText('Cédula');
    const numeroInput = getByLabelText('Número');
    const correoInput = getByLabelText('Correo');
    const passwordInput = getByLabelText('Contraseña');

    fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
    fireEvent.change(cedulaInput, { target: { value: '1234567890' } });
    fireEvent.change(numeroInput, { target: { value: '987654321' } });
    fireEvent.change(correoInput, { target: { value: 'correo@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nombreInput.value).toBe('John Doe');
    expect(cedulaInput.value).toBe('1234567890');
    expect(numeroInput.value).toBe('987654321');
    expect(correoInput.value).toBe('correo@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('llama a la función onSaveCliente al enviar el formulario', async () => {
    const mockOnSaveCliente = jest.fn();

    const { getByText, getByLabelText } = render(<SignUp onSaveCliente={mockOnSaveCliente} />);
    const nombreInput = getByLabelText('Nombre');
    const cedulaInput = getByLabelText('Cédula');
    const numeroInput = getByLabelText('Número');
    const correoInput = getByLabelText('Correo');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Registrarme');

    fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
    fireEvent.change(cedulaInput, { target: { value: '1234567890' } });
    fireEvent.change(numeroInput, { target: { value: '987654321' } });
    fireEvent.change(correoInput, { target: { value: 'correo@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Espera a que se resuelva la llamada a la función onSaveCliente
    await waitFor(() => expect(mockOnSaveCliente).toHaveBeenCalledTimes(1));

    // Verifica que se haya llamado a la función onSaveCliente con los datos correctos
    expect(mockOnSaveCliente).toHaveBeenCalledWith({
      nombre_cliente: 'John Doe',
      cedula: '1234567890',
      numero_personal: '987654321',
      correo_personal: 'correo@example.com',
      password: 'password123',
    });
  });
});
