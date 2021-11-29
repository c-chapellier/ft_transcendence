import { Injectable } from "@nestjs/common";
import { DmDTO } from "./dto/dm.dto";
import { DmEntity } from "../model/dm.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DmService {
  constructor(
    @InjectRepository(DmEntity)
    private readonly repo: Repository<DmEntity>
  ) {}

  public async getAllDms(): Promise<DmDTO[]> {
    const dm = await this.repo
      .find()
      .then((dm) => dm.map((channel) => DmDTO.fromEntity(channel)));
    return dm;
  }

  public async create(dto: DmDTO): Promise<DmDTO> {
    return this.repo.save(dto).then((channel) => DmDTO.fromEntity(channel));
  }
}
