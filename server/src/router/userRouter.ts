import userController from '../controllers/UserController.js'
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', userController.getUser)
userRouter.get('/logout', userController.logout)

export default userRouter;
