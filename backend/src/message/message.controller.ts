import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './message.dto';

@Controller('message')
export class MessageController {
  constructor(private serv: MessageService) { }

  @Get()
  public async getAllMessages(): Promise<MessageDTO[]> {
    return await this.serv.getAllMessages()
  }

  @Post()
  public async post(@Body() dto: MessageDTO): Promise<MessageDTO> {
    return this.serv.create(dto);
  }
}