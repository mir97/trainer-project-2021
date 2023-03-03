import { Router } from '@awaitjs/express';
import { InMemoryGroupService } from '../services/InMemory-group.service';
import { GroupController } from '../controllers/group.controller';
import { PostgresGroupsService } from '../services/postgres-groups.service';

const router = Router();

const storageService = new PostgresGroupsService();
const groupController = new GroupController(storageService);

router.getAsync('/groups/:id', groupController.getGroup.bind(groupController));
router.getAsync('/groups', groupController.getAllGroups.bind(groupController));
router.putAsync('/groups/addUsersToGroup', groupController.addUsersToGroup.bind(groupController));
router.postAsync('/groups/', groupController.createGroup.bind(groupController));
router.putAsync('/groups/:id', groupController.updateGroup.bind(groupController));
router.deleteAsync('/groups/:id', groupController.deleteGroup.bind(groupController));

export default router;
