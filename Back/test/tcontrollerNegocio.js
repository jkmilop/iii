const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  crearNegocio,
  getNegocioId,
  getNegocios
} = require('../app/controller/controllerNegocio');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('crearNegocio', () => {
  it('should create a new business', async () => {
    const req = {
      body: {
        emprendedor_id: 1,
        nombre_negocio: 'Business Name',
        direccion: 'Business Address',
        numero_contacto: '123456789'
      }
    };
    const res = {
      json: jest.fn()
    };
    pool.query.mockResolvedValueOnce({
      rows: [{ /* mocked business object */ }]
    });

    await crearNegocio(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.searchEmprendedor, [1]);
    expect(pool.query).toHaveBeenCalledWith(
      queries.addNegocio,
      [1, 'Business Name', 'Business Address', '123456789']
    );
    expect(res.json).toHaveBeenCalledWith({ /* mocked business object */ });
  });

  it('should return an error if required data is missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await crearNegocio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
  });

  it('should return an error if the emprendedor does not exist', async () => {
    const req = {
      body: {
        emprendedor_id: 1,
        nombre_negocio: 'Business Name',
        direccion: 'Business Address',
        numero_contacto: '123456789'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    pool.query.mockResolvedValueOnce({ rows: [] });

    await crearNegocio(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El emprendedor no existe.');
  });
});

describe('getNegocioId', () => {
  it('should get the details of a business by ID', async () => {
    const req = {
      body: {
        negocio_id: 1
      }
    };
    const res = {
      json: jest.fn()
    };
    pool.query.mockResolvedValueOnce({
      rows: [{ /* mocked business object */ }]
    });

    await getNegocioId(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.searchNegocio, [1]);
    expect(res.json).toHaveBeenCalledWith({ /* mocked business object */ });
  });

  it('should return an error if the business does not exist', async () => {
    const req = {
      body: {
        negocio_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    pool.query.mockResolvedValueOnce({ rows: [] });

    await getNegocioId(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
  });
});

describe('getNegocios', () => {
  it('should get all businesses', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    pool.query.mockResolvedValueOnce({
      rows: [{ /* mocked business objects */ }]
    });

    await getNegocios(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.getNegocios);
    expect(res.json).toHaveBeenCalledWith([{ /* mocked business objects */ }]);
  });
});
