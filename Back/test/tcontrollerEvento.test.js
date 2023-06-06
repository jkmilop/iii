const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const {
  addEvento,
  getEventos,
  getEventoId
} = require('../app/controller/controllerEvento');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');

describe('addEvento', () => {
  it('should add a new evento to the database', async () => {
    const req = {
      body: {
        negocio_id: 1,
        fecha_hora: '2023-05-15 10:00',
        nombre_evento: 'Event Name'
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
    const mockNewEvent = {
      rows: [{ evento_id: 1 }]
    };
    pool.query.mockReturnValueOnce(mockNegocioVerification);
    pool.query.mockReturnValueOnce(mockNewEvent);

    await addEvento(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewEvent.rows[0]);
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

    await addEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos.');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the negocio does not exist', async () => {
    const req = {
      body: {
        negocio_id: 100,
        fecha_hora: '2023-05-15 10:00',
        nombre_evento: 'Event Name'
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

    await addEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El negocio no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('getEventos', () => {
  it('should return all eventos from the database', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const mockEventos = {
      rows: [
        { evento_id: 1, nombre_evento: 'Event 1' },
        { evento_id: 2, nombre_evento: 'Event 2' },
        { evento_id: 3, nombre_evento: 'Event 3' }
      ]
    };
    pool.query.mockReturnValueOnce(mockEventos);

    await getEventos(req, res);

    expect(res.json).toHaveBeenCalledWith(mockEventos.rows);
  });

  // Add more test cases as needed
});

describe('getEventoId', () => {
  it('should return the evento with the specified id', async () => {
    const req = {
      body: {
        evento_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEvento = {
      rows: [{ evento_id: 1, nombre_evento: 'Event Name' }]
    };
    pool.query.mockReturnValueOnce(mockEvento);

    await getEventoId(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockEvento.rows[0]);
  });

  it('should return an error if the evento does not exist', async () => {
    const req = {
      body: {
        evento_id: 100
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEvento = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockEvento);

    await getEventoId(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El evento no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
