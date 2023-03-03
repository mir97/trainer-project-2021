import { Request, Response } from 'express';
import { PostgresAuthService } from '../services/postgres-auth.service';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants';

export class AuthController {
  constructor(private authStorage: PostgresAuthService) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    const result = await this.authStorage.login(req.body);
    if (result) {
      res.status(200).json({
        id: result.id,
        login: result.login,
        token: jwt.sign({ id: result.id, login: result.login }, SECRET_KEY, { expiresIn: '24h' }),
      });
    } else [res.status(404).json({ message: 'User not found' })];
  }
}
