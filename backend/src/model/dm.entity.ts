import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "./conversation.entity";
import { UserEntity } from "./user.entity";
import { TimestampEntites } from "./generic/timestamp";

@Entity({ name: "dm" })
export class DmEntity extends TimestampEntites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 1000 })
  text: string;

  @ManyToOne((type) => ConversationEntity, (conversation) => conversation.dm)
  conversation: ConversationEntity;

  @ManyToOne((type) => UserEntity, (user) => user.messages)
  sender: UserEntity;
}
