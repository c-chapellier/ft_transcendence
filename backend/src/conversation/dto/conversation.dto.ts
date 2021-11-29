import { DmDTO } from "../../dm/dto/dm.dto";
import { ConversationEntity } from "../../model/conversation.entity";
import { UserDTO } from "../../user/user.dto";

export class ConversationDTO implements Readonly<ConversationDTO> {
  id?: string;

  users: UserDTO[];

  dm?: DmDTO[];

  public static from(dto: Partial<ConversationDTO>) {
    const newConversation = new ConversationDTO();
    newConversation.id = dto.id;
    newConversation.users = dto.users || [];
    newConversation.dm = dto.dm || [];
    return newConversation;
  }

  public static fromEntity(entity: ConversationEntity) {
    //console.log("from entity", entity, entity.owner)
    return this.from({
      id: entity.id,
      users: entity.users
        ? entity.users.map((user) => UserDTO.fromEntity(user))
        : [],
      dm: entity.dm
        ? entity.dm.map((message) => DmDTO.fromEntity(message))
        : [],
    });
  }

  public toEntity() {
    const newConversation = new ConversationEntity();
    newConversation.id = this.id;
    newConversation.users = this.users.map((user) => user.toEntity()) || [];
    newConversation.dm = this.dm.map((message) => message.toEntity()) || [];
    return newConversation;
  }
}
