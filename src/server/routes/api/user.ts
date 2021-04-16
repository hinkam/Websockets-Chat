import { Router, Request, Response } from "express";

export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
    res.json({ username: res.locals.username })
})