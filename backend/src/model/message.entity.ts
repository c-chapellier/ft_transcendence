import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChannelEntity } from "./channel.entity";
import { UserEntity } from "./user.entity";
import { TimestampEntites } from "./generic/timestamp";

@Entity({ name: "message" })
export class MessageEntity extends TimestampEntites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 1000 })
  text: string;

  @ManyToOne((type) => ChannelEntity, (channel) => channel.messages)
  channel: ChannelEntity;

  @ManyToOne((type) => UserEntity, (user) => user.messages)
  sender: UserEntity;
}
