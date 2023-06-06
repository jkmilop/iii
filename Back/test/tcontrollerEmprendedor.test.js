const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../app/utils/jwtGenerator');
const {
  crearEmprendedor,
  getEmprendedores,
  getEmprendedorId,
  updateEmprendedor
} = require('../app/controller/controllerEmprendedor');

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');
jest.mock('bcryptjs');
jest.mock('../app/utils/jwtGenerator');

describe('crearEmprendedor', () => {
  it('should add a new emprendedor to the database', async () => {
    const req = {
      body: {
        nombre_emprendedor: 'John Doe',
        password: 'password123',
        cedula: '123456789',
        numero_personal: '1234567890',
        correo_personal: 'john@example.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEmprendedorVerification = {
      rows: []
    };
    const mockNewUser = {
      rows: [{ emprendedor_id: 1 }]
    };
    pool.query.mockReturnValueOnce(mockEmprendedorVerification);
    pool.query.mockReturnValueOnce(mockNewUser);
    bcrypt.genSalt.mockResolvedValue('mockSalt');
    bcrypt.hash.mockResolvedValue('mockHash');

    await crearEmprendedor(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNewUser.rows[0]);
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

    await crearEmprendedor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Se requiere ingresar todos los datos');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return an error if the emprendedor email already exists', async () => {
    const req = {
      body: {
        nombre_emprendedor: 'John Doe',
        password: 'password123',
        cedula: '123456789',
        numero_personal: '1234567890',
        correo_personal: 'john@example.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEmprendedorVerification = {
      rows: [{}]
    };
    pool.query.mockReturnValueOnce(mockEmprendedorVerification);

    await crearEmprendedor(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ya existe.' });
  });

  // Add more test cases as needed
});

describe('getEmprendedores', () => {
  it('should return all emprendedores from the database', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const mockEmprendedores = {
      rows: [
        { emprendedor_id: 1, nombre_emprendedor: 'John Doe' },
        { emprendedor_id: 2, nombre_emprendedor: 'Jane Smith' },
        { emprendedor_id: 3, nombre_emprendedor: 'Bob Johnson' }
      ]
    };
    pool.query.mockReturnValueOnce(mockEmprendedores);

    await getEmprendedores(req, res);

    expect(res.json).toHaveBeenCalledWith(mockEmprendedores.rows);
  });

  // Add more test cases as needed
});

describe('getEmprendedorId', () => {
  it('should return the emprendedor with the specified id', async () => {
    const req = {
      body: {
        emprendedor_id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEmprendedorId = {
      rows: [{ emprendedor_id: 1, nombre_emprendedor: 'John Doe' }]
    };
    pool.query.mockReturnValueOnce(mockEmprendedorId);

    await getEmprendedorId(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockEmprendedorId.rows);
  });

  it('should return an error if the emprendedor does not exist', async () => {
    const req = {
      body: {
        emprendedor_id: 100
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const mockEmprendedorId = {
      rows: []
    };
    pool.query.mockReturnValueOnce(mockEmprendedorId);

    await getEmprendedorId(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('El emprendedor no existe.');
    expect(res.json).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

describe('updateEmprendedor', () => {
  it('should update the emprendedor with the specified id', async () => {
    const req = {
      body: {
        emprendedor_id: 1,
        nombre_emprendedor: 'John Doe',
        numero_personal: '1234567890',
        correo_personal: 'john@example.com'
      }
    };
    const res = {
      json: jest.fn()
    };
    const mockUpdatedEmprendedor = {
      rows: [{ emprendedor_id: 1, nombre_emprendedor: 'John Doe' }]
    };
    pool.query.mockReturnValueOnce(mockUpdatedEmprendedor);

    await updateEmprendedor(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUpdatedEmprendedor.rows[0]);
  });

  // Add more test cases as needed
});
