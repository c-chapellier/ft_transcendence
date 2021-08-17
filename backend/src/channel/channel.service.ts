import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from '../model/channel.entity'
import { Repository } from 'typeorm'
import { ChannelDTO } from './channel.dto'

@Injectable()
export class ChannelService {
  constructor(@InjectRepository(ChannelEntity) private readonly repo: Repository<ChannelEntity>) { }

  public async getAllChannels(): Promise<ChannelDTO[]> {
    const channels = await this.repo.find()
      .then(channels => channels.map(channel => ChannelDTO.fromEntity(channel)))
    return channels
  }

  public async getOneChannel(id: string): Promise<ChannelDTO> {
    return ChannelDTO.fromEntity(await this.repo.findOne(id));
  }

  public async create(dto: ChannelDTO): Promise<ChannelDTO> {
    return this.repo.save(dto)
      .then(channel => ChannelDTO.fromEntity(channel))
  }
}