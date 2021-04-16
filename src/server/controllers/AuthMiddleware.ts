import cookieParser from 'cookie';
import { Request, Response } from 'express';
import { IncomingMessage } from 'node:http';
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

export async function websocketMiddleware(req: IncomingMessage, callback: (err?: Error) => void) {
    const userController = await (await getDatabase()).getUserController(); 

    if (req.headers.cookie){
        console.log(req.headers.cookie);
        const cookie = cookieParser.parse(req.headers.cookie) as Record<string, string>;
        console.log(cookie);
        if (!cookie.access_token){
            callback(new Error('Authentication error'));
        } else {
            if (userController){
                const user = await userController.getUserByToken(cookie.access_token);
                if (user){
                    callback();
                } else {
                    callback(new Error('Authentication error'));
                }
            }
        }
    }


    
    
}