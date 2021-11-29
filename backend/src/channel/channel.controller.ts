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
import { ChannelService } from "./channel.service";
import { ChannelDTO } from "./dto/channel.dto";
import { NewChannelDTO } from "./dto/newchannel.dto";
import { UserService } from "../user/user.service";

@Controller("channel")
export class ChannelController {
  constructor(
    private readonly service: ChannelService,
    private readonly userService: UserService
  ) {}

  @Get()
  public async getAllChannels(): Promise<ChannelDTO[]> {
    return await this.service.getAllChannels();
  }

  @Get(":id")
  public async getOneUser(@Param("id") id: string): Promise<ChannelDTO> {
    return await this.service.getOneChannel(id);
  }

  @Post("/create")
  @UsePipes(ValidationPipe)
  public async create(@Body() newdto: NewChannelDTO): Promise<ChannelDTO> {
    const owner = await this.userService.getUserById(newdto.ownerId);

    let dto: ChannelDTO = new ChannelDTO();
    dto.name = newdto.name;
    dto.owner = owner;
    dto.pwd = newdto.pwd;

    return this.service.create(dto);
  }
}
