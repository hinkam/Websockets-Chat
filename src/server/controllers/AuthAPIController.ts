import { TokenController } from "../database/repositoryControllers/tokenController";
import { UserController } from "../database/repositoryControllers/userController";
import { compare, hash } from "bcrypt";
import { getDatabase } from "../database";
import { Request, Response } from 'express';


class AuthAPIController{
    private userController: UserController;
    private tokenController: TokenController;

    constructor(userController: UserController, tokenController: TokenController){
        this.userController = userController;
        this.tokenController = tokenController;
    }

    public async signup(req: Request, res:Response){
        if(await this.userController.checkUserExists(req.body.username)){
            res.status(400);
            res.send();
        } else {
            const passhash = await hash( req.body.password, 8 );
            if (await this.userController.addUser(req.body.username, passhash)){
                res.status(200);
                res.send();
            } else {
                res.status(400);
                res.send();
            }
        }
    }

    public async login(req: Request, res:Response){
        const user = await this.userController.getUser(req.body.username)
        
        if (user){
            if (compare(req.body.password, user.pwHash)){
                const generatedToken = await hash((Math.random() * (10 ** 9)).toString(), 10);
                await this.tokenController.addToken(generatedToken, user);
                res.cookie('access_token', generatedToken, { httpOnly: true });
                res.send();
                return;
            }
        } else {
            res.status(400);
            res.send();
        }
        
    }

    public async logout(req: Request, res: Response){
        const cookie = req.cookies as { access_token? : string };
        if (cookie.access_token) {
            await this.tokenController.deleteToken(cookie.access_token);
            res.clearCookie('access_token');
            res.status(200);
            res.send();
        } else {
            res.status(400);
            res.send();
        }
    }
}

let authAPIController : AuthAPIController;

// Нужен ли async
export async function getAuthAPIController(): Promise<AuthAPIController> {
    if (!authAPIController){
        const userController = await getDatabase().getUserController();
        const tokenController = await getDatabase().getTokenController();
        if (userController && tokenController) {
            authAPIController = new AuthAPIController(userController, tokenController);
            return authAPIController;
        } else {
            console.log("Database controllers error")
        }
    }
    return authAPIController;
}