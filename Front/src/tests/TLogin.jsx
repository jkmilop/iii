import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('se renderiza sin errores', () => {
    render(<Login />);
  });

  it('actualiza el estado al escribir en los campos de correo y contraseña', () => {
    const { getByLabelText } = render(<Login />);
    const correoInput = getByLabelText('Correo');
    const contraInput = getByLabelText('Contraseña');

    fireEvent.change(correoInput, { target: { value: 'correo@example.com' } });
    fireEvent.change(contraInput, { target: { value: 'contraseña123' } });

    expect(correoInput.value).toBe('correo@example.com');
    expect(contraInput.value).toBe('contraseña123');
  });

  it('llama a la API de inicio de sesión al hacer clic en el botón "Ingresar"', async () => {
    // Simula una llamada fetch exitosa y una respuesta para simular el inicio de sesión exitoso
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'abc123' }),
      })
    );

    const { getByText, getByLabelText } = render(<Login />);
    const correoInput = getByLabelText('Correo');
    const contraInput = getByLabelText('Contraseña');
    const ingresarButton = getByText('Ingresar');

    fireEvent.change(correoInput, { target: { value: 'correo@example.com' } });
    fireEvent.change(contraInput, { target: { value: 'contraseña123' } });
    fireEvent.click(ingresarButton);

    // Espera a que se resuelva la llamada fetch y se maneje la respuesta
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verifica que se haya llamado a la API con los datos correctos
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo_personal: 'correo@example.com', password: 'contraseña123' }),
    });

    // Restaura el comportamiento original de la función fetch
    global.fetch.mockRestore();
  });

  it('llama a la API de verificación al hacer clic en el botón "Verificar"', async () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la verificación exitosa
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ isValid: true }),
      })
    );

    const { getByText } = render(<Login />);
    const verificarButton = getByText('Verificar');

    fireEvent.click(verificarButton);

    // Espera a que se resuelva la llamada fetch y se maneje la respuesta
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verifica que se haya llamado a la API de verificación
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/is-verify');

    // Restaura el comportamiento original de la función fetch
    global.fetch.mockRestore();
  });
});
