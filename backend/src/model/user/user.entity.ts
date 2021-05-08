import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}