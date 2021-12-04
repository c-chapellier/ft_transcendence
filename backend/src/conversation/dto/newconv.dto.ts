import { DmDTO } from "../../dm/dto/dm.dto";
import { ConversationEntity } from "../../model/conversation.entity";
import { UserDTO } from "../../user/dto/user.dto";
import { ValidationPipe } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { ConversationDTO } from "./conversation.dto";

export class NewConvDTO implements Readonly<NewConvDTO> {
  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  receiverId: string;
}
