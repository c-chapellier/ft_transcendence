import { StatusEnum } from "./../components/enum";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ChannelEntity } from "./channel.entity";
import { MessageEntity } from "./message.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", unique: true })
  login: string;

  @Column({ type: "varchar" })
  avatar: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ nullable: true, default: null })
  twoFactorAuthenticationSecret: string;

  @Column({ type: "varchar", length: 300 })
  description: string;

  @Column({ type: "int", default: StatusEnum.DISCONNECTED })
  status: StatusEnum;

  @Column({ type: "boolean", default: false })
  has2FactorAuth: boolean;

  @Column({ type: "int", default: 0 })
  score: number;

  @Column({ type: "int", default: 0 })
  nbrVictory: number;

  @Column({ type: "int", default: 0 })
  nbrLoss: number;

  // @Column({ type: 'int', default: [] })
  // friends: UserEntity[];

  // @Column({ type: 'int', default: [] })
  // blockUsers: UserEntity[];

  // @Column({ type: 'int', default: [] })
  // achievements: Achievement[];

  @OneToMany((type) => MessageEntity, (message) => message.sender)
  messages: MessageEntity[];

  @OneToMany((type) => ChannelEntity, (channel) => channel.owner)
  channels: ChannelEntity[];
}
