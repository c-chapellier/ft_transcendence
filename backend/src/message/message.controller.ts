import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDTO } from "./dto/message.dto";
import { NewMessageDTO } from "./dto/newmessage.dto";
import { UserService } from "../user/user.service";
import { ChannelService } from "../channel/channel.service";

@Controller("messagechannel")
export class MessageController {
  constructor(
    private serv: MessageService,
    private readonly userService: UserService,
    private readonly channelService: ChannelService
  ) {}

  @Get()
  public async getAllMessages(): Promise<MessageDTO[]> {
    return await this.serv.getAllMessages();
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async post(@Body() newdto: NewMessageDTO): Promise<MessageDTO> {
    const sender = await this.userService.getUserById(newdto.senderId);
    const channel = await this.channelService.getOneChannel(newdto.channelId);

    let dto: MessageDTO = new MessageDTO();
    dto.channel = channel;
    dto.sender = sender;
    dto.text = newdto.text;

    return this.serv.create(dto);
  }
}
