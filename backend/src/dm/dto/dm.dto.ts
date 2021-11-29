import { ConversationDTO } from "../../conversation/dto/conversation.dto";
import { DmEntity } from "../../model/dm.entity";
import { UserDTO } from "../../user/user.dto";

export class DmDTO implements Readonly<DmDTO> {
  id?: string;

  text: string;

  // date: Date;

  conversation: ConversationDTO;

  sender: UserDTO;

  public static from(dto: Partial<DmDTO>) {
    const newDm = new DmDTO();
    newDm.id = dto.id;
    newDm.text = dto.text;
    // newDm.date = dto.date;
    newDm.conversation = dto.conversation;
    newDm.sender = dto.sender;
    return newDm;
  }

  public static fromEntity(entity: DmEntity) {
    return this.from({
      id: entity.id,
      text: entity.text,
      // date: entity.createdAt,
      conversation: ConversationDTO.fromEntity(entity.conversation),
      sender: UserDTO.fromEntity(entity.sender),
    });
  }

  public toEntity() {
    const newDm = new DmEntity();
    newDm.id = this.id;
    newDm.text = this.text;
    // newDm.date = this.date;
    newDm.conversation = this.conversation.toEntity();
    newDm.sender = this.sender.toEntity();
    return newDm;
  }
}
