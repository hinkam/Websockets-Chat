import { Router, Request, Response } from 'express';
import { middleware } from '../../controllers/AuthMiddleware';
import { authRouter } from './auth';
import { userRouter } from './user';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/user', middleware);

apiRouter.use('/user', userRouter);