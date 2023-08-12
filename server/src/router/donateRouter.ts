import { Router } from 'express';
import donateController from '../controllers/DonateController.js';

const donateRouter = Router();

donateRouter.get('/getAll', donateController.getAll);
donateRouter.post('/add', donateController.addDonate);
donateRouter.patch('/updateAmount/:id', donateController.updateAmount);
donateRouter.patch('/updateGifts/:id', donateController.updateGifts);
donateRouter.delete('/delete/:id', donateController.delete);

export default donateRouter;
