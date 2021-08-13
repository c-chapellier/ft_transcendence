import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from '../model/channel.entity'
import { Repository } from 'typeorm'
import { ChannelDTO } from './channel.dto'

@Injectable()
export class ChannelService {
  constructor(@InjectRepository(ChannelEntity) private readonly repo: Repository<ChannelEntity>) { }

  public async getAllChannels(): Promise<ChannelDTO[]> {
    return await this.repo.find()
      .then(channels => channels.map(channel => ChannelDTO.fromEntity(channel)))
  }

  public async getOneChannel(id: string): Promise<ChannelDTO> {
    return ChannelDTO.fromEntity(await this.repo.findOne(id));
  }

  public async create(dto: ChannelDTO): Promise<ChannelDTO> {
    return this.repo.save(dto.toEntity())
      .then(channel => ChannelDTO.fromEntity(channel))
  }
}