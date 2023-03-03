import { NextFunction, Request, Response } from 'express';
import { isValidateGroup } from '../utils/validate';
import { PostgresGroupsService } from 'services/postgres-groups.service';
import { TryCatchWrapper } from '../decorator/tryCatchWrapper.decarator';

export class GroupController {
  private groupStorage: PostgresGroupsService;

  constructor(groupStorage: PostgresGroupsService) {
    this.groupStorage = groupStorage;
  }

  @TryCatchWrapper
  async getGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await this.groupStorage.findGroupByID(req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send('Group not found');
    }
  }

  @TryCatchWrapper
  async getAllGroups(req: Request, res: Response): Promise<void> {
    const result = await this.groupStorage.getAllGroups();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Groups not found');
    }
  }

  @TryCatchWrapper
  async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = isValidateGroup(req.body);
    if (!error) {
      const newGroup = await this.groupStorage.createGroup(value);
      res.status(newGroup ? 201 : 400).send(newGroup ? newGroup : 'Group was not created');
    } else {
      res.status(400).send(error.message);
    }
  }

  @TryCatchWrapper
  async updateGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = isValidateGroup(req.body);
    if (!error) {
      const updateGroup = await this.groupStorage.updateGroup(req.params.id, value);
      res.status(updateGroup ? 201 : 400).send(updateGroup ? updateGroup : 'Group was not updated');
    } else {
      res.status(400).send(error.message);
    }
  }

  @TryCatchWrapper
  async deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.groupStorage.deleteGroup(req.params.id);
    if (result) {
      res.status(200).send('Group was deleted');
    } else {
      res.status(404).send('Group not found');
    }
  }

  @TryCatchWrapper
  async addUsersToGroup(req: Request, res: Response): Promise<void> {
    const result = await this.groupStorage.addUsersToGroup(req.body.groupId, req.body.userIds);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('GroupUsers was not created');
    }
  }
}
