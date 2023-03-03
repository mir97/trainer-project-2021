import { NextFunction, Request, Response } from 'express';
import { isValidateUser } from '../utils/validate';
import { PostgresUsersService } from 'services/postgres-users.service';
import { TryCatchWrapper } from '../decorator/tryCatchWrapper.decarator';

export class UserController {
  private userStorage: PostgresUsersService;

  constructor(userStorage: PostgresUsersService) {
    this.userStorage = userStorage;
  }

  @TryCatchWrapper
  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await this.userStorage.findUserByID(req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send('User not found');
    }

    next();
  }

  @TryCatchWrapper
  async getAllUser(req: Request, res: Response): Promise<void> {
    const result = await this.userStorage.getAutoSuggestUsers(
      req.query.loginSubstring as string,
      Number(req.query.limit),
    );
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Users not found');
    }
  }

  @TryCatchWrapper
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = isValidateUser(req.body); 
    if (!error) {
      const newUser = await this.userStorage.createUser(value);
      res.status(newUser ? 201 : 400).send(newUser ? newUser : 'User was not created');
    } else {
      res.status(400).send(error.message);
    }
  }

  @TryCatchWrapper
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = isValidateUser(req.body);
    if (!error) {
      const updateUser = await this.userStorage.updateUser(req.params.id, value);
      res.status(updateUser ? 201 : 400).send(updateUser ? updateUser : 'User was not updated');
    } else {
      res.status(400).send(error.message);
    }
  }

  @TryCatchWrapper
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userStorage.deleteUser(req.params.id);
    if (result) {
      res.status(200).send('User was deleted');
    }
    res.status(404).send('User not found');
  }
}
