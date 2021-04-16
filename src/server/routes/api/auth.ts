import { Router, Request, Response } from 'express';
import { getAuthAPIController } from '../../controllers/AuthAPIController';

export const authRouter = Router();


authRouter.post('/login', async (req: Request, res: Response) => {
    await (await getAuthAPIController()).login(req, res);
});

authRouter.post('/signup', async (req: Request, res: Response) => {
    await (await getAuthAPIController()).signup(req, res);
});

authRouter.delete('/logout', async (req: Request, res: Response) => {
    await (await getAuthAPIController()).logout(req, res);
});
