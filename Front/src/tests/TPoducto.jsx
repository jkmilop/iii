import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Producto from '../components/producto/Producto';

describe('Producto', () => {
  it('se renderiza sin errores', () => {
    render(<Producto />);
  });

  it('muestra los datos de los productos en la tabla', () => {
    const { getByText } = render(<Producto />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Negocio ID')).toBeInTheDocument();
    expect(getByText('Nombre del Producto')).toBeInTheDocument();
    expect(getByText('Valor')).toBeInTheDocument();
  });

  it('filtra los datos de la tabla en función del valor del input', () => {
    const { getByPlaceholderText, getByText } = render(<Producto />);
    const input = getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'producto1' } });
    expect(getByText('producto1')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en el botón "Agregar Producto"', () => {
    const { getByText, getByRole } = render(<Producto />);
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('guarda un nuevo producto al hacer clic en el botón "Guardar" en el modal', () => {
    // Simula una llamada fetch exitosa y una respuesta para simular la creación exitosa del producto
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ producto_id: 1, nombre_producto: 'Nuevo Producto' }),
      })
    );

    const { getByText, getByLabelText } = render(<Producto />);
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);

    // Rellena los campos del formulario en el modal
    const productNameInput = getByLabelText('Nombre del Producto');
    fireEvent.change(productNameInput, { target: { value: 'Nuevo Producto' } });

    const saveButton = getByText('Guardar');
    fireEvent.click(saveButton);

    // Verifica que el nuevo producto se muestre en la tabla
    expect(getByText('Nuevo Producto')).toBeInTheDocument();
  });
});
