import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants';

export const authMiddleware = (req: Request, res: Response, next) => {
  try {
    const tokenJwt = req.headers.authorization;
    if (tokenJwt) {
      jwt.verify(tokenJwt.split(' ')[1] as string, SECRET_KEY);
      next();
    } else {
      res.status(401).send('Unauthorized error');
    }
  } catch {
    res.status(403).send('Forbidden error');
  }
};
