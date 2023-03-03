import {  GroupController} from '../controllers/group.controller';
import { InMemoryGroupService } from '../services/InMemory-group.service';
import mock from '../mocks/mock';

const storageService = new InMemoryGroupService();
const groupController = new GroupController(storageService);
const req = mock.mockRequest();
const res = mock.mockResponse();
const group = {
  id: "1",
  name: "test",
  permissions: ['READ']
};

describe('groupController.findGroupByID', () => {
  req.params.id = '1';
  req.body = {};

  test('getGroupById method: should return group object by id', async () => {
    jest.spyOn(storageService, 'findGroupByID');
    await groupController.getGroup(req, res, mock.mockNext);
    expect(res.send).toBeCalledWith(group);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('groupController.deleteGroup', () => {
  req.params.id = '1';
  req.body = {};

  test('deleteGroup method: should delete group', async () => {
    jest.spyOn(storageService, 'deleteGroup');
    await groupController.deleteGroup(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('groupController.createGroup', () => {
  req.params = {};
  req.body = {
    name: 'test2',
    permissions: ['READ']
  };

  test('createGroup method: should return created group', async () => {
    jest.spyOn(storageService, 'createGroup');
    await groupController.createGroup(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe('groupController.updateGroup', () => {
  req.params.id = '1';
  req.body = {
    name: 'test3',
    permissions: ['READ']
  };

  test('updateGroup method: should return new Group', async () => {
    jest.spyOn(storageService, 'updateGroup');
    await groupController.updateGroup(req, res, mock.mockNext);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
