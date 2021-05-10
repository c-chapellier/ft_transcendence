import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    date: Date = new Date();

    @Column()
    score: string = '';

    // 1 - 1 A match has one player
    @OneToOne(type => User) @JoinColumn()
    user1: User = new User();

    // 1 - 1 A match has one opponent
    @OneToOne(type => User) @JoinColumn()
    user2: User = new User();

    // 1 - 1 A match has one winner
    @OneToOne(type => User) @JoinColumn()
    winner: User = new User();
}