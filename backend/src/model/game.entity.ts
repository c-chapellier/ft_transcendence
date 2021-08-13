import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChannelEntity } from "./channel.entity";
import { UserEntity } from "./user.entity";


@Entity({ name: 'game' })
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    date: string;

    @OneToOne(type => UserEntity)
    @JoinColumn() 
    player1: UserEntity;

    @OneToOne(type => UserEntity)
    @JoinColumn() 
    player2: UserEntity;

    @OneToOne(type => UserEntity)
    @JoinColumn() 
    winner: UserEntity;

    @OneToOne(type => UserEntity)
    @JoinColumn() 
    loser: UserEntity;
}