import PanopticonController from '../controllers/RoomContentController.js'
import { Router } from 'express';

const roomContentRouter = Router();

roomContentRouter.get('/', PanopticonController.getAll);
roomContentRouter.post('/', PanopticonController.add);
roomContentRouter.delete('/:id', PanopticonController.delete);

export default roomContentRouter;
