import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column()
    hasPassword: boolean = false;

    @Column()
    password: string = "";

    // 1 - 1 A channel has one and only one owner
    @OneToOne(type => User) @JoinColumn() 
    owner: User = new User();

    // N - N A channel has many members and all members has any channel
    @ManyToMany(type => User) @JoinTable()
    members?: User[];

    // 1 - N A channel has many messages
    @OneToMany(type => Message, message => message.channel)
    messages?: Message[];
}