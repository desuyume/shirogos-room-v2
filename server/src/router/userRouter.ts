import authMiddleware from '../middlewares/AuthMiddleware.js'
import userController from '../controllers/UserController.js'
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', userController.getUserTokens)
userRouter.get('/logout', userController.logout)
userRouter.get('/refresh', userController.refresh)

export default userRouter;
