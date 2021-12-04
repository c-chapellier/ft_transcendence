import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelEntity } from "../model/channel.entity";
import { Repository, getConnection } from "typeorm";
import { ChannelDTO } from "./dto/channel.dto";
import { UpdateUserChannelDTO } from "./dto/updateUserChannel.dto";
import { UserDTO } from "@src/user/dto/user.dto";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly repo: Repository<ChannelEntity>
  ) {}

  public async getAllChannels(): Promise<ChannelDTO[]> {
    const channels = await this.repo
      .find({ relations: ["users", "messages", "owner"] })
      .then((channels) =>
        channels.map((channel) => ChannelDTO.fromEntity(channel))
      );
    return channels;
  }

  public async getOneChannel(id: string): Promise<ChannelDTO> {
    return ChannelDTO.fromEntity(
      await this.repo.findOne(id, { relations: ["users", "messages", "owner"] })
    );
  }

  public async create(dto: ChannelDTO): Promise<ChannelDTO> {
    return this.repo
      .save(dto)
      .then((channel) => ChannelDTO.fromEntity(channel));
  }

  public async update(id: string, dto: ChannelDTO): Promise<ChannelDTO> {
    dto.id = id;

    await this.repo.save(dto);
    return this.getOneChannel(id);
  }

  public async adduser(
    channel: ChannelDTO,
    user: UserDTO
  ): Promise<ChannelDTO> {
    // await getConnection()
    //   .createQueryBuilder()
    //   .relation(ChannelEntity, "users")
    //   .of(channel)
    //   .add(user);

    const res = channel.users.filter((userInside) => userInside.id === user.id);

    if (res.length > 0) return channel;
    channel.users.push(user);

    return this.repo
      .save(channel)
      .then((channel) => ChannelDTO.fromEntity(channel));
  }

  public async deleteUser(
    channel: ChannelDTO,
    user: UserDTO
  ): Promise<ChannelDTO> {
    const res = channel.users.filter((userInside) => userInside.id !== user.id);
    channel.users = res;

    return this.repo
      .save(channel)
      .then((channel) => ChannelDTO.fromEntity(channel));
  }
  //   return this.service.adduser(dto);
}
