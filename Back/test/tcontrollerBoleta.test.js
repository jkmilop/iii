const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  addBoleta,
  getBoletaByCliente
} = require('../app/controller/controllerBoleta');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('addBoleta', () => {
  it('should add a boleta to the database', async () => {
    const req = {
      body: {
        evento_id: 1,
        silla_id: 1,
        cliente_id: 1,
        fecha_hora: '2023-05-15 12:00:00',
        valor_boleta: 10.5
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockClienteVerification = {
      rows: []
    };
    const mockEventoVerification = {
      rows: []
    };
    const mockSillaVerification = {
      rows: []
    };
    const mockNewBoleta = {
      rows: [{
        id: 1,
        evento_id: 1,
        silla_id: 1,
        cliente_id: 1,
        fecha_hora: '2023-05-15 12:00:00',
        valor_boleta: 10.5
      }]
    };
    pool.query.mockImplementation((query, params) => {
      if (query === queries.searchCliente) {
        mockClienteVerification.rows = params[1] === 1 ? [{}] : [];
        return mockClienteVerification;
      } else if (query === queries.searchEvento) {
        mockEventoVerification.rows = params[1] === 1 ? [{}] : [];
        return mockEventoVerification;
      } else if (query === queries.searchSilla) {
        mockSillaVerification.rows = params[1] === 1 ? [{}] : [];
        return mockSillaVerification;
      } else if (query === queries.addBoleta) {
        mockNewBoleta.rows[0].id += 1;
        return mockNewBoleta;
      }
    });

    await addBoleta(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewBoleta.rows[0]);
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

    await addBoleta(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the cliente does not exist', async () => {
    const req = {
      body: {
        evento_id: 1,
        silla_id: 1,
        cliente_id: 1,
        fecha_hora: '2023-05-15 12:00:00',
        valor_boleta: 10.5
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockClienteVerification = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockClienteVerification);

    await addBoleta(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El cliente no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('getBoletaByCliente', () => {
  it('should return boletas for the given cliente', async () => {
    const req = {
      body: {
        cliente_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockBoletas = {
      rows: [
        { id: 1, cliente_id: 1 },
        { id: 2, cliente_id: 1 },
        { id: 3, cliente_id: 1 }
      ]
    };
    pool.query.mockReturnValueOnce(mockBoletas);

    await getBoletaByCliente(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockBoletas.rows);
  });

  it('should return an error if cliente_id is missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };

    await getBoletaByCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar el id de la boleta y el id del cliente.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the cliente does not exist', async () => {
    const req = {
      body: {
        cliente_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockBoletas = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockBoletas);

    await getBoletaByCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El cliente no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
