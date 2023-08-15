import uniqueRoleController from '../controllers/UniqueRoleController.js'
import { Router } from 'express';

const uniqueRoleRouter = Router();

uniqueRoleRouter.get('/', uniqueRoleController.getAll);
uniqueRoleRouter.post('/', uniqueRoleController.add);
uniqueRoleRouter.delete('/:id', uniqueRoleController.delete);

export default uniqueRoleRouter;
