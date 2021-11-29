import { MessageDTO } from "../../message/dto/message.dto";
import { ChannelEntity } from "../../model/channel.entity";
import { UserDTO } from "../../user/user.dto";

export class ChannelDTO implements Readonly<ChannelDTO> {
  id: string;

  name: string;

  pwd: string;

  owner: UserDTO;

  users: UserDTO[];

  messages: MessageDTO[];

  public static from(dto: Partial<ChannelDTO>) {
    const newChannel = new ChannelDTO();
    newChannel.id = dto.id;
    newChannel.name = dto.name;
    newChannel.pwd = dto.pwd;
    newChannel.owner = dto.owner;
    newChannel.users = dto.users || [];
    newChannel.messages = dto.messages || [];
    return newChannel;
  }

  public static fromEntity(entity: ChannelEntity) {
    //console.log("from entity", entity, entity.owner)
    return this.from({
      id: entity.id,
      pwd: entity.pwd,
      name: entity.name,
      // owner: UserDTO.fromEntity(entity.owner),
      // users: entity.users
      //   ? entity.users.map((user) => UserDTO.fromEntity(user))
      //   : [],
      // messages: entity.messages
      //   ? entity.messages.map((message) => MessageDTO.fromEntity(message))
      //   : [],
    });
  }

  public toEntity() {
    const newChannel = new ChannelEntity();
    newChannel.id = this.id;
    newChannel.name = this.name;
    newChannel.pwd = this.pwd;
    // newChannel.owner = this.owner.toEntity();
    // newChannel.users = this.users.map((user) => user.toEntity()) || [];
    // newChannel.messages =
    //   this.messages.map((message) => message.toEntity()) || [];
    return newChannel;
  }
}
