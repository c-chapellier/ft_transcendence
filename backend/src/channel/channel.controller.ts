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
import { UpdateUserChannelDTO } from "./dto/updateUserChannel.dto";
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
  public async getOneChannel(@Param("id") id: string): Promise<ChannelDTO> {
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

  @Post("/update/:id")
  @UsePipes(ValidationPipe)
  public async update(
    @Param("id") id: string,
    @Body() dto: ChannelDTO
  ): Promise<ChannelDTO> {
    return this.service.update(id, dto);
  }

  @Post("/adduser")
  @UsePipes(ValidationPipe)
  public async addUser(@Body() dto: UpdateUserChannelDTO): Promise<ChannelDTO> {
    const channel = await this.service.getOneChannel(dto.channelId);
    const user = await this.userService.getUserById(dto.userId);

    return this.service.adduser(channel, user);
  }

  @Post("/deleteuser")
  @UsePipes(ValidationPipe)
  public async deleteUser(
    @Body() dto: UpdateUserChannelDTO
  ): Promise<ChannelDTO> {
    const channel = await this.service.getOneChannel(dto.channelId);
    const user = await this.userService.getUserById(dto.userId);

    return this.service.deleteUser(channel, user);
  }
}
