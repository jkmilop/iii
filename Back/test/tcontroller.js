const pool = require('../app/config/db');
const queries = require('../app/config/queries');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../app/utils/jwtGenerator');
const {
  consultDB,
  login,
  isVerify
} = require('../app/controller/controller')

// Mocking dependencies
jest.mock('../app/config/db');
jest.mock('../app/config/queries');
jest.mock('bcryptjs');
jest.mock('../app/utils/jwtGenerator');

describe('consultDB', () => {
  it('should check if tables exist and create them if they do not', () => {
    const mockQuery = jest.fn();
    pool.query.mockImplementation(mockQuery);
    mockQuery.mockImplementation((_, callback) => {
      const result = {
        rowCount: 0
      };
      callback(null, result);
    });

    consultDB();

    expect(pool.query).toHaveBeenCalledWith(queries.consultDB, expect.any(Function));
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(queries.createClient, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createEmprendedor, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createNegocio, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createSilla, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createProductos, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createEvento, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createBoleta, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith(queries.createBoletaProducto, expect.any(Function));
  });
});

describe('login', () => {
  it('should login a user with valid credentials', async () => {
    const req = {
      body: {
        correo_personal: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      json: jest.fn()
    };
    const mockUser = {
      rows: [{
        cliente_id: 1,
        password: 'hashedPassword'
      }]
    };
    pool.query.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwtGenerator.mockReturnValueOnce('token');

    await login(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.checkClienteEmailExists, ['test@example.com']);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwtGenerator).toHaveBeenCalledWith(1);
    expect(jwtGenerator).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith('token');
  });

  it('should return an error for incorrect email or password', async () => {
    const req = {
      body: {
        correo_personal: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockUser = {
      rows: []
    };
    pool.query.mockResolvedValueOnce(mockUser);

    await login(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.checkClienteEmailExists, ['test@example.com']);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Correo o contraseña incorrecta');
  });
});

describe('isVerify', () => {
  it('should return true', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    await isVerify(req, res);

    expect(res.json).toHaveBeenCalledWith(true);
  });
});
