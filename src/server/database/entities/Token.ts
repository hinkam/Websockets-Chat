import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
    
    @PrimaryColumn()
    tokenID!: string;

    @ManyToOne(type => User, user => user.tokens)
    user!: User;
    
}