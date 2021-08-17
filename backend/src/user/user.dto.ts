import { ChannelDTO } from '@src/channel/channel.dto';
import { MessageDTO } from '@src/message/message.dto';
import { IsBoolean, IsNumber, IsString, IsUUID, } from 'class-validator';
import { UserEntity } from '../model/user.entity';

export class UserDTO implements Readonly<UserDTO> {
  id: string

  name: string

  description: string

  status: number

  has2FactorAuth: boolean

  score: number

  nbrVictory: number

  nbrLoss: number

  messages: MessageDTO[];

  channels: ChannelDTO[];

  public static from(dto: Partial<UserDTO>) {
    const newUser = new UserDTO();
    newUser.id = dto.id
    newUser.name = dto.name
    newUser.description = dto.description
    newUser.status = dto.status
    newUser.has2FactorAuth = dto.has2FactorAuth
    newUser.score = dto.score
    newUser.nbrVictory = dto.nbrVictory
    newUser.nbrLoss = dto.nbrLoss
    newUser.messages = dto.messages
    newUser.channels = dto.channels
    return newUser
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      has2FactorAuth: entity.has2FactorAuth,
      score: entity.score,
      nbrVictory: entity.nbrVictory,
      nbrLoss: entity.nbrLoss,
      // messages: entity.messages ? entity.messages.map(m => MessageDTO.fromEntity(m)) : [],
      // channels: entity.channels ? entity.channels.map(m => ChannelDTO.fromEntity(m)) : []
    });
  }

  public toEntity() {
    const newUser = new UserEntity()
    newUser.id = this.id
    newUser.name = this.name
    newUser.description = this.description
    newUser.status = this.status
    newUser.has2FactorAuth = this.has2FactorAuth
    newUser.score = this.score
    newUser.nbrVictory = this.nbrVictory
    newUser.nbrLoss = this.nbrLoss
    // newUser.messages = this.messages.map(m => m.toEntity())
    // newUser.channels = this.channels.map(c => c.toEntity())
    return newUser
  }
}
