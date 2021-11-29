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
import { ConversationService } from "./conversation.service";
import { ConversationDTO } from "./dto/conversation.dto";
import { NewConvDTO } from "./dto/newconv.dto";
import { UserService } from "../user/user.service";
import { ConversationEntity } from "../model/conversation.entity";
import { Timestamp } from "typeorm";
import { TimestampEntites } from "@src/model/generic/timestamp";
import { validate } from "class-validator";

@Controller("conversation")
export class ConversationController {
  constructor(
    private service: ConversationService,
    private userService: UserService
  ) {}

  @Get()
  public async getAllConversations(): Promise<ConversationDTO[]> {
    return await this.service.getAllConversations();
  }

  @Get(":id")
  public async getOneUser(@Param("id") id: string): Promise<ConversationDTO> {
    return await this.service.getOneConversation(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async post(@Body() newconvdto: NewConvDTO): Promise<ConversationDTO> {
    const sender = await this.userService.getUserById(newconvdto.senderId);
    const receiver = await this.userService.getUserById(newconvdto.receiverId);

    let convdto: ConversationDTO = new ConversationDTO();
    // convdto.users.push(sender, receiver);
    convdto.users = [sender, receiver];
    return this.service.create(convdto);
  }
}
