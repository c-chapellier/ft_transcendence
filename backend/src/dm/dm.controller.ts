import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { DmService } from "./dm.service";
import { DmDTO } from "./dto/dm.dto";
import { NewDmDTO } from "./dto/newdm.dto";
import { UserService } from "../user/user.service";
import { ConversationService } from "../conversation/conversation.service";

@Controller("dm")
export class DmController {
  constructor(
    private readonly serv: DmService,
    private readonly userServ: UserService,
    private readonly convServ: ConversationService
  ) {}

  @Get()
  public async getAllDms(): Promise<DmDTO[]> {
    return await this.serv.getAllDms();
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async post(@Body() newdto: NewDmDTO): Promise<DmDTO> {
    const conv = await this.convServ.getOneConversation(newdto.conversationId);
    const user = await this.userServ.getUserById(newdto.senderId);

    let dto: DmDTO = new DmDTO();

    dto.sender = user;
    dto.text = newdto.text;
    dto.conversation = conv;

    return this.serv.create(dto);
  }
}
