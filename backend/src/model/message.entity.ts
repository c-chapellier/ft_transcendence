import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChannelEntity } from "./channel.entity";
import { UserEntity } from "./user.entity";


@Entity({ name: 'message' })
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 1000})
    text: string;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(type => ChannelEntity, channel => channel.messages)
    channel: ChannelEntity;

    @ManyToOne(type => UserEntity, user => user.messages)
    sender: UserEntity;
}