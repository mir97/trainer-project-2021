import { UserController } from '../controllers/user.controller';
import { InMemoryUserService } from '../services/InMemory-user.service';
import mock from '../mocks/mock';

const storageService = new InMemoryUserService();
const userController = new UserController(storageService);
const req = mock.mockRequest();
const res = mock.mockResponse();
const user = {
    id: '1',
    login: 'valera',
    password: '32ggfn',
    age: 12,
    isDeleted: false,
  };

describe('usersController.findUserByID', () => {
  req.params.id = '1';
  req.body = {};

  test('getUserById method: should return user object by id', async () => {
    jest.spyOn(storageService, 'findUserByID');
    await userController.getUser(req, res, mock.mockNext);
    expect(res.send).toBeCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('usersController.deleteUser', () => {
  req.params.id = '1';
  req.body = {};

  test('getUserById method: should delete user', async () => {
    jest.spyOn(storageService, 'deleteUser');
    await userController.deleteUser(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('usersController.createUser', () => {
  req.body = {
    login: 'va2343lera',
    password: '324565ggfn',
    age: 12,
    isDeleted: false
  };
  req.params = {};


  test('getUserById method: should return created user', async () => {
    jest.spyOn(storageService, 'createUser');
    await userController.createUser(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe('usersController.updateUser', () => {
  req.params.id = '1';
  req.body = {
    login: 'va2343lera',
    password: '324565ggfn',
    age: 12,
    isDeleted: false
  };

  test('getUserById method: should return newUser', async () => {
    jest.spyOn(storageService, 'updateUser');
    await userController.updateUser(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
