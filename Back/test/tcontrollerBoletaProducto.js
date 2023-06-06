const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  addBoletaProducto,
  searchBoletaProducto
} = require('../app/controller/controllerBoletaProducto');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('addBoletaProducto', () => {
  it('should add a boleta producto to the database', async () => {
    const req = {
      body: {
        boleta_id: 1,
        producto_id: 1,
        cantidad_producto: 2
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockProductoVerification = {
      rows: []
    };
    const mockBoletaVerification = {
      rows: []
    };
    const mockNewBoletaProducto = {
      rows: [{
        id: 1,
        boleta_id: 1,
        producto_id: 1,
        cantidad_producto: 2
      }]
    };
    pool.query.mockImplementation((query, params) => {
      if (query === queries.searchProducto) {
        mockProductoVerification.rows = params[1] === 1 ? [{}] : [];
        return mockProductoVerification;
      } else if (query === queries.searchBoleta) {
        mockBoletaVerification.rows = params[1] === 1 ? [{}] : [];
        return mockBoletaVerification;
      } else if (query === queries.addBoletaProducto) {
        mockNewBoletaProducto.rows[0].id += 1;
        return mockNewBoletaProducto;
      }
    });

    await addBoletaProducto(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewBoletaProducto.rows[0]);
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

    await addBoletaProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the producto does not exist', async () => {
    const req = {
      body: {
        boleta_id: 1,
        producto_id: 1,
        cantidad_producto: 2
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockProductoVerification = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockProductoVerification);

    await addBoletaProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('La boleta no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('searchBoletaProducto', () => {
  it('should return boleta productos for the given boleta', async () => {
    const req = {
      body: {
        boleta_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockBoletaProductos = {
      rows: [
        { id: 1, boleta_id: 1 },
        { id: 2, boleta_id: 1 },
        { id: 3, boleta_id: 1 }
      ]
    };
    pool.query.mockReturnValueOnce(mockBoletaProductos);

    await searchBoletaProducto(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockBoletaProductos.rows);
  });

  it('should return an error if boleta_id is missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };

    await searchBoletaProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar el id de la boleta y el id del cliente.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the boleta does not exist', async () => {
    const req = {
      body: {
        boleta_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockBoletaProductos = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockBoletaProductos);

    await searchBoletaProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El la boleta no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
