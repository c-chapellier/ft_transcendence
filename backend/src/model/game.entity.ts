import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChannelEntity } from "./channel.entity";
import { UserEntity } from "./user.entity";
import { TimestampEntites } from "./generic/timestamp";

@Entity({ name: "game" })
export class GameEntity extends TimestampEntites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  player1: UserEntity;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  player2: UserEntity;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  winner: UserEntity;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  loser: UserEntity;
}
