import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { DmEntity } from "./dm.entity";
import { UserEntity } from "./user.entity";
import { TimestampEntites } from "./generic/timestamp";

@Entity({ name: "conversation" })
export class ConversationEntity extends TimestampEntites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany((type) => UserEntity)
  @JoinTable()
  users: UserEntity[];

  @OneToMany((type) => DmEntity, (dm) => dm.conversation)
  dm: DmEntity[];
}
