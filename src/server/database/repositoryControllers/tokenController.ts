import { Repository } from "typeorm";
import { Token } from "../entities/Token";
import { User } from "../entities/User";


export class TokenController{
    private tokenRepository: Repository<Token>

    constructor(tokenRepository: Repository<Token>){
        this.tokenRepository = tokenRepository;
    }


    public async addToken(token: string, user: User){
        await this.tokenRepository.save({
            tokenID: token,
            user
        })

    }

    public async deleteToken(token: string){
        await this.tokenRepository.delete({
            tokenID: token
        })
    }

}
