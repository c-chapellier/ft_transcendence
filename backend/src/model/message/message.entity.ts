import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    body: string = "";

    @Column(type => Date)
    date: Date = new Date();

    // 1 - 1 A message has one and only one owner
    @OneToOne(type => User) @JoinColumn() 
    sender: User = new User();

    // N - 1 A message has one channel
    @ManyToOne(type => Channel, channel => channel.messages) @JoinTable()
    channel: Channel = new Channel();
}