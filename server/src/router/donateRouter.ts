import { Router } from 'express';
import donateController from '../controllers/DonateController.js';

const donateRouter = Router();

donateRouter.get('/', donateController.getAll);
donateRouter.post('/', donateController.add);
donateRouter.patch('/updateAmount/:id', donateController.updateAmount);
donateRouter.patch('/updateGifts/:id', donateController.updateGifts);
donateRouter.delete('/:id', donateController.delete);


export default donateRouter;
