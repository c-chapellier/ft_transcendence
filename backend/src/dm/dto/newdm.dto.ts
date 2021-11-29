import { ConversationDTO } from "../../conversation/dto/conversation.dto";
import { DmEntity } from "../../model/dm.entity";
import { UserDTO } from "../../user/user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class NewDmDTO implements Readonly<NewDmDTO> {
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;
}
