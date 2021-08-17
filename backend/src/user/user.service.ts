import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../model/user.entity'
import { Repository } from 'typeorm'
import { UserDTO } from './user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) { }

  public async getAllUsers(): Promise<UserDTO[]> {
    const users =  await this.repository.find()
      .then(users => users.map(user => UserDTO.fromEntity(user)))
    return users;
  }

  public async getOneUser(id: string): Promise<UserDTO> {
    return UserDTO.fromEntity(await this.repository.findOne(id));
  }

  public async create(dto: UserDTO): Promise<UserDTO> {
    return this.repository.save(dto)
      .then(user => UserDTO.fromEntity(user))
  }
}
