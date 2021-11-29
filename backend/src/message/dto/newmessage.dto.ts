import { IsNotEmpty, IsString } from "class-validator";

export class NewMessageDTO implements Readonly<NewMessageDTO> {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;
}
