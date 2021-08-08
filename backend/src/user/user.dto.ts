import { IsBoolean, IsNumber, IsString, IsUUID, } from 'class-validator';
import { UserEntity } from '../model/user.entity';

export class UserDTO implements Readonly<UserDTO> {
  @IsUUID()
  id: string

  @IsString()
  name: string

  @IsString()
  description: string

  @IsBoolean()
  isOnline: boolean

  @IsBoolean()
  isPlaying: boolean

  @IsBoolean()
  has2FactorAuth: boolean

  @IsNumber()
  level: number

  @IsNumber()
  nbrVictory: number

  @IsNumber()
  nbrLoss: number

  public static from(dto: Partial<UserDTO>) {
    const newUser = new UserDTO();
    newUser.id = dto.id
    newUser.name = dto.name
    newUser.description = dto.description
    newUser.isOnline = dto.isOnline
    newUser.isPlaying = dto.isPlaying
    newUser.has2FactorAuth = dto.has2FactorAuth
    newUser.level = dto.level
    newUser.nbrVictory = dto.nbrVictory
    newUser.nbrLoss = dto.nbrLoss
    return newUser
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      isOnline: entity.isOnline,
      isPlaying: entity.isPlaying,
      has2FactorAuth: entity.has2FactorAuth,
      level: entity.level,
      nbrVictory: entity.nbrVictory,
      nbrLoss: entity.nbrLoss,
    });
  }

  public toEntity() {
    const newUser = new UserEntity()
    newUser.id = this.id
    newUser.name = this.name
    newUser.description = this.description
    newUser.isOnline = this.isOnline
    newUser.isPlaying = this.isPlaying
    newUser.has2FactorAuth = this.has2FactorAuth
    newUser.level = this.level
    newUser.nbrVictory = this.nbrVictory
    newUser.nbrLoss = this.nbrLoss
    return newUser
  }
}
