import { ChannelDTO } from "../channel/channel.dto";
import { MessageEntity } from "../model/message.entity";
import { UserDTO } from "../user/user.dto";

export class MessageDTO implements Readonly<MessageDTO> {
    id: string;

    text: string;

    date: Date;

    channel: ChannelDTO;

    sender: UserDTO;

    public static from(dto: Partial<MessageDTO>) {
        const newChannel = new MessageDTO();
        newChannel.id = dto.id;
        newChannel.text = dto.text;
        newChannel.date = dto.date;
        newChannel.channel = dto.channel;
        newChannel.sender = dto.sender;
        return newChannel;
      }
    
      public static fromEntity(entity: MessageEntity) {
        return this.from({
          id: entity.id,
          text: entity.text,
          date: entity.date,
          channel: ChannelDTO.fromEntity(entity.channel),
          sender: UserDTO.from(entity.sender)
        });
      }
    
      public toEntity() {
        const newChannel = new MessageEntity()
        newChannel.id = this.id
        newChannel.text = this.text
        newChannel.date = this.date;
        newChannel.channel = this.channel.toEntity();
        newChannel.sender = this.sender.toEntity();
        return newChannel;
      }
}