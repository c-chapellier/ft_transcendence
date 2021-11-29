import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "../model/message.entity";
import { Repository } from "typeorm";
import { MessageDTO } from "./dto/message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repo: Repository<MessageEntity>
  ) {}

  public async getAllMessages(): Promise<MessageDTO[]> {
    return await this.repo
      .find()
      .then((messages) =>
        messages.map((message) => MessageDTO.fromEntity(message))
      );
  }

  public async create(dto: MessageDTO): Promise<MessageDTO> {
    return this.repo
      .save(dto)
      .then((message) => MessageDTO.fromEntity(message));
  }
}
