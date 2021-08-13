import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelDTO } from './channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private service: ChannelService) { }

  @Get()
  public async getAllChannels(): Promise<ChannelDTO[]> {
    return await this.service.getAllChannels()
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<ChannelDTO> {
    return await this.service.getOneChannel(id);
  }

  @Post()
  public async post(@Body() dto: ChannelDTO): Promise<ChannelDTO> {
    return this.service.create(dto);
  }
}