import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserChannelDTO implements Readonly<UpdateUserChannelDTO> {
  @IsNotEmpty()
  @IsString()
  channelId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
