import { Injectable } from "@nestjs/common";
import { ConversationDTO } from "./dto/conversation.dto";
import { ConversationEntity } from "../model/conversation.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { isNotEmpty } from "class-validator";

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly repo: Repository<ConversationEntity>
  ) {}

  public async getAllConversations(): Promise<ConversationDTO[]> {
    const channels = await this.repo
      .find()
      .then((channels) =>
        channels.map((channel) => ConversationDTO.fromEntity(channel))
      );
    return channels;
  }

  public async getOneConversation(id: string): Promise<ConversationDTO> {
    return ConversationDTO.fromEntity(await this.repo.findOne(id));
  }

  public async create(dto: ConversationDTO): Promise<ConversationDTO> {
    const users = dto.users.map((user) => user.toEntity());
    const conv = await this.repo
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.users", "user")
      .getMany();

    const check = (elem) =>
      users.every((tmp) =>
        [elem.users[0].id, elem.users[1].id].includes(tmp.id)
      );

    if (conv.some(check)) return dto;
    return this.repo.save(dto).then((dto) => ConversationDTO.fromEntity(dto));
  }
}
