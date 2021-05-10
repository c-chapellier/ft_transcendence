import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Guild } from '../guild/guild.entity';

enum Role {
    USER = 1,
    ADMIN = 2,
}

enum Status {
    CONNECTED = 1,
    DISCONNECTED = 2,
    BANNED = 3,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column()
    pseudo: string = "";

    @Column()
    password: string = "";

    @Column()
    avatar: string = "";

    @Column()
    nbVictory: number = 0;

    @Column()
    nbLose: number = 0;

    @Column()
    role: Role = 1;

    @Column()
    status: Status = 1;

    @Column()
    score: number = 0;

    // N - 1 A user has one guild
    @ManyToOne(type => Guild, guild => guild.members) 
    guild: Guild = new Guild();

    // N - N A user has many friends
    @ManyToMany(type => User) @JoinTable() 
    friends?: User[];
}