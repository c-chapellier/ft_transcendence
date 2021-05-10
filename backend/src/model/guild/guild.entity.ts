import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Guild {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column()
    anagram: string = "";

    @Column()
    score: number = 0;

    @Column()
    ownerId: number = 0;

    // 1 - 1 A guild has one and only one owner
    @OneToOne(type => User, {nullable: true}) @JoinColumn() 
    owner?: User;

    // 1 - N A guild has many members
    @OneToMany(type => User, user => user.guild, {nullable: true})
    members?: User[];
}