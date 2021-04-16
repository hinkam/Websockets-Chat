import { Connection, createConnection} from "typeorm";
import { Token } from "./entities/Token";
import { User } from "./entities/User";
import { TokenController } from "./repositoryControllers/tokenController";
import { UserController } from "./repositoryControllers/userController";

class DataBase{
    private connection!: Connection;
    private userController: UserController | undefined;
    private tokenController: TokenController | undefined;

    async init(){
        this.connection = await createConnection(
            {
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    User, Token
                ],
                synchronize: true,
                logging: false
            }
        );
        this.userController = new UserController(this.connection.getRepository(User));
        this.tokenController = new TokenController(this.connection.getRepository(Token));
    };

    public async getUserController(){
        return this.userController;
    };

    public async getTokenController(){
        return this.tokenController;
    }

}

let dataBase : DataBase | undefined;

// Нужен ли async
export function getDatabase(): DataBase{ 
    if (!dataBase){
        dataBase = new DataBase();
        dataBase.init();
    }
    return dataBase;
}