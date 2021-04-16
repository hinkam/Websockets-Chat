import { QueryBuilder, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../entities/User";


export class UserController{
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>){
        this.userRepository = userRepository;
    };


    public async addUser(userName: string, passHash: string){
        if (await this.checkUserExists(userName)){
            return false;
        } else {
            this.userRepository.insert({
                username: userName,
                pwHash: passHash
            })
            return true;
        }

    };

    public async checkUserExists(userName: string){
        const response = await this.userRepository.find({
            select: [ "username" ],
            where: {username : userName}
        });
        return response.length > 0;
    };

    public async findUser(userID: number){
        const response = await this.userRepository.findOne({
            where: { userID }
        })
        return response;
    }

    public async getUserByToken(hashToken: string){
        const response = await this.userRepository.findOne({
            join: { alias: "users", innerJoin: { tokens: "users.tokens" } },
            where: (qb: SelectQueryBuilder<User>) => {
                qb.where("tokens.tokenID = :tokenID", { tokenID: hashToken});
            }
        });
        
        return response;
    };

    public async getUser(username: string){
        const response = await this.userRepository.findOne({
            where: { username }
        })
        return response;
    };
    
}