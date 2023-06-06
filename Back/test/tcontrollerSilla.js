const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  crearSilla,
  getSillaIdByNegocio
} = require('../app/controller/controllerSilla');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('crearSilla', () => {
  it('should create a new silla in the database', async () => {
    const req = {
      body: {
        negocio_id: 1,
        valor: 100,
        posicion: 'A1',
        tipo_silla: 'Normal'
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
    const mockNewSilla = {
      rows: [{ silla_id: 1 }]
    };
    pool.query.mockReturnValueOnce(mockNegocioVerification);
    pool.query.mockReturnValueOnce(mockNewSilla);

    await crearSilla(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewSilla.rows[0]);
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

    await crearSilla(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the negocio does not exist', async () => {
    const req = {
      body: {
        negocio_id: 100,
        valor: 100,
        posicion: 'A1',
        tipo_silla: 'Normal'
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

    await crearSilla(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('getSillaIdByNegocio', () => {
  it('should return the sillas of a given negocio', async () => {
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
    const mockSillas = {
      rows: [
        { silla_id: 1, posicion: 'A1', tipo_silla: 'Normal' },
        { silla_id: 2, posicion: 'A2', tipo_silla: 'VIP' }
      ]
    };
    pool.query.mockReturnValueOnce(mockSillas);

    await getSillaIdByNegocio(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockSillas.rows);
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
    const mockSillas = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockSillas);

    await getSillaIdByNegocio(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
