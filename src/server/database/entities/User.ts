import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./Token";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    userID!: number;

    @Column()
    username!: string;

    @Column()
    pwHash!: string;

    @OneToMany(type => Token, token => token.user)
    tokens!: Token[];
    
}