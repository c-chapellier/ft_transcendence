import { IsNotEmpty, IsString } from "class-validator";

export class NewChannelDTO implements Readonly<NewChannelDTO> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  pwd: string = "";

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
