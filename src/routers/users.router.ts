import { UserController } from '../controllers/user.controller';
import { PostgresUsersService } from '../services/postgres-users.service';
import { Router } from '@awaitjs/express';
import { InMemoryUserService } from '../services/InMemory-user.service';

const router = Router();

const storageService = new PostgresUsersService();
const userController = new UserController(storageService);

router.getAsync('/users/:id', userController.getUser.bind(userController));
router.getAsync('/users', userController.getAllUser.bind(userController));
router.postAsync('/users/', userController.createUser.bind(userController));
router.putAsync('/users/:id', userController.updateUser.bind(userController));
router.deleteAsync('/users/:id', userController.deleteUser.bind(userController));

export default router;
