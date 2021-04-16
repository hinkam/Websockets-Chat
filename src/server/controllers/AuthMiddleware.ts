import { Request, Response } from 'express';
import { getDatabase } from "../database";

export async function middleware(req: Request, res: Response, next: () => void){
    const userController = await (await getDatabase()).getUserController(); 

    const cookie = req.cookies as { access_token? : string };
    if (!cookie.access_token){
        res.status(401);
        res.send()
    } else {
        if (userController){
            const user = await userController.getUserByToken(cookie.access_token);
            if (user){
                res.locals.username = user.username;
                next();
            } else {
                res.status(401);
                res.send();
            }
        }
    }





}