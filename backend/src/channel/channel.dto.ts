import { MessageDTO } from "../message/message.dto";
import { ChannelEntity } from "../model/channel.entity";
import { UserDTO } from "../user/user.dto";


export class ChannelDTO implements Readonly<ChannelDTO> {
    id: string;

    name: string;

    pwd: string;

    owner: UserDTO;

    users: UserDTO[];

    messages: MessageDTO[];


  public static from(dto: Partial<ChannelDTO>) {
    const newChannel = new ChannelDTO();
    newChannel.id = dto.id
    newChannel.name = dto.name
    newChannel.pwd = dto.pwd
    newChannel.owner = dto.owner
    newChannel.users = dto.users
    newChannel.messages = dto.messages
    return newChannel;
  }

  public static fromEntity(entity: ChannelEntity) {
    console.log(entity.users, entity.messages)
    const users = [];
    if(entity.users) {
      for (let i = 0; i < entity.users.length; ++i){
        users.push(UserDTO.fromEntity(entity.users[i]))
      }
    }
    const messages = [];
    if(entity.messages) {
      for (let i = 0; i < entity.messages.length; ++i){
        messages.push(MessageDTO.fromEntity(entity.messages[i]))
      }
    }
    return this.from({
      id: entity.id,
      pwd: entity.pwd,
      name: entity.name,
      owner: UserDTO.fromEntity(entity.owner),
      users: users,
      messages: messages
    });
  }

  public toEntity() {
    const newChannel = new ChannelEntity()
    newChannel.id = this.id
    newChannel.name = this.name
    newChannel.pwd = this.pwd
    newChannel.owner = this.owner.toEntity();
    newChannel.users = [];//this.users;
    return newChannel;
  }
}