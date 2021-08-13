import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'channel' }) 
export class ChannelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'varchar', length: 20})
    pwd: string;

    @ManyToOne(type => UserEntity, user => user.channels)
    owner: UserEntity;

    @ManyToMany(type => UserEntity)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(type => MessageEntity, message => message.channel)
    messages: MessageEntity[];

}