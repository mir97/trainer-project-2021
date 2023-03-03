import { Router } from '@awaitjs/express';
import { AuthController } from '../controllers/auth.contrOller';
import { PostgresAuthService } from '../services/postgres-auth.service';

const router = Router();

const storageService = new PostgresAuthService();
const authController = new AuthController(storageService);

router.getAsync('/login', authController.loginUser.bind(authController));

export default router;
