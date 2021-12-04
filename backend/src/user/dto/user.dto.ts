import { ChannelDTO } from "../../channel/dto/channel.dto";
import { MessageDTO } from "../../message/dto/message.dto";
import { DmDTO } from "../../dm/dto/dm.dto";
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  IsOptional,
} from "class-validator";
import { UserEntity } from "../../model/user.entity";

export class UserDTO implements Readonly<UserDTO> {
  id?: string;

  name?: string;

  login?: string;

  avatar?: string;

  description?: string;

  twoFactorAuthenticationSecret?: string;

  email?: string;

  status?: number;

  has2FactorAuth?: boolean;

  score?: number;

  nbrVictory?: number;

  nbrLoss?: number;

  messages?: MessageDTO[];

  dm?: DmDTO[];

  channels?: ChannelDTO[];

  // conversations?: ConversationDTO[];

  public static from(dto: Partial<UserDTO>) {
    const newUser = new UserDTO();
    newUser.id = dto.id;
    newUser.name = dto.name;
    newUser.login = dto.login;
    newUser.avatar = dto.avatar;
    newUser.email = dto.email;
    newUser.twoFactorAuthenticationSecret = dto.twoFactorAuthenticationSecret;
    newUser.description = dto.description;
    newUser.status = dto.status;
    newUser.has2FactorAuth = dto.has2FactorAuth;
    newUser.score = dto.score;
    newUser.nbrVictory = dto.nbrVictory;
    newUser.nbrLoss = dto.nbrLoss;
    newUser.messages = dto.messages;
    newUser.dm = dto.dm;
    newUser.channels = dto.channels;
    // newUser.conversations = dto.conversations;
    return newUser;
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      login: entity.login,
      avatar: entity.avatar,
      email: entity.email,
      twoFactorAuthenticationSecret: entity.twoFactorAuthenticationSecret,
      description: entity.description,
      status: entity.status,
      has2FactorAuth: entity.has2FactorAuth,
      score: entity.score,
      nbrVictory: entity.nbrVictory,
      nbrLoss: entity.nbrLoss,
      messages: entity.messages
        ? entity.messages.map((m) => MessageDTO.fromEntity(m))
        : [],
      dm: entity.dm ? entity.dm.map((m) => DmDTO.fromEntity(m)) : [],
      channels: entity.channels
        ? entity.channels.map((m) => ChannelDTO.fromEntity(m))
        : [],
      // conversations: entity.conversations
      //   ? entity.conversations.map((m) => ConversationDTO.fromEntity(m))
      //   : [],
    });
  }

  public toEntity() {
    const newUser = new UserEntity();
    newUser.id = this.id;
    newUser.name = this.name;
    newUser.login = this.login;
    newUser.avatar = this.avatar;
    newUser.email = this.email;
    newUser.twoFactorAuthenticationSecret = this.twoFactorAuthenticationSecret;
    newUser.description = this.description;
    newUser.status = this.status;
    newUser.has2FactorAuth = this.has2FactorAuth;
    newUser.score = this.score;
    newUser.nbrVictory = this.nbrVictory;
    newUser.nbrLoss = this.nbrLoss;
    newUser.messages = this.messages.map((m) => m.toEntity());
    newUser.dm = this.dm.map((m) => m.toEntity());
    newUser.channels = this.channels.map((c) => c.toEntity());
    // newUser.conversations = this.conversations.map((c) => c.toEntity());
    return newUser;
  }
}
