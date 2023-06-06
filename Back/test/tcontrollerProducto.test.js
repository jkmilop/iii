const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  crearProducto,
  getProductoByNegocio
} = require('../app/controller/controllerProducto');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('crearProducto', () => {
  it('should create a new producto in the database', async () => {
    const req = {
      body: {
        negocio_id: 1,
        nombre_producto: 'Product Name',
        valor: 100
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockNegocioVerification = {
      rows: [{ negocio_id: 1 }]
    };
    const mockNewProduct = {
      rows: [{ producto_id: 1 }]
    };
    pool.query.mockReturnValueOnce(mockNegocioVerification);
    pool.query.mockReturnValueOnce(mockNewProduct);

    await crearProducto(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewProduct.rows[0]);
  });

  it('should return an error if any data is missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };

    await crearProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the negocio does not exist', async () => {
    const req = {
      body: {
        negocio_id: 100,
        nombre_producto: 'Product Name',
        valor: 100
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockNegocioVerification = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockNegocioVerification);

    await crearProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('getProductoByNegocio', () => {
  it('should return the productos of a given negocio', async () => {
    const req = {
      body: {
        negocio_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockNegocio = {
      rows: [{ negocio_id: 1 }]
    };
    const mockProductos = {
      rows: [
        { producto_id: 1, nombre_producto: 'Product 1' },
        { producto_id: 2, nombre_producto: 'Product 2' }
      ]
    };
    pool.query.mockReturnValueOnce(mockNegocio);
    pool.query.mockReturnValueOnce(mockProductos);

    await getProductoByNegocio(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockProductos.rows);
  });

  it('should return an error if the negocio does not exist', async () => {
    const req = {
      body: {
        negocio_id: 100
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockNegocio = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockNegocio);

    await getProductoByNegocio(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the negocio has no productos', async () => {
    const req = {
      body: {
        negocio_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockNegocio = {
      rows: [{ negocio_id: 1 }]
    };
    const mockProductos = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockNegocio);
    pool.query.mockReturnValueOnce(mockProductos);

    await getProductoByNegocio(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no tiene productos creados.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
