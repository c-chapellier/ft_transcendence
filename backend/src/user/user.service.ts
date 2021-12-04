import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../model/user.entity";
import { Repository, getConnection } from "typeorm";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  public async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.repository
      .find()
      .then((users) => users.map((user) => UserDTO.fromEntity(user)));
    return users;
  }

  public async getUserById(id: string): Promise<UserDTO> {
    const user = await this.repository.findOne({ id });
    if (!user) {
      throw new NotFoundException("That User Doesn't Exist");
    }
    return UserDTO.fromEntity(user);
  }

  public async create(dto: UserDTO): Promise<UserDTO> {
    const user = this.repository.create(dto);
    return this.repository.save(dto).then((user) => UserDTO.fromEntity(user));
  }

  public async updateProfile(id: string, dto: UserDTO): Promise<UserDTO> {
    await getConnection()
      .createQueryBuilder()
      .update(UserEntity)
      .set({ ...dto })
      .where("id = :id", { id: id })
      .execute();
    return this.getUserById(id);
  }

  public async setTwoFactorAuthenticationSecret(
    secret: string,
    userId: string
  ) {
    return this.repository.update(userId, {
      twoFactorAuthenticationSecret: secret,
      has2FactorAuth: true,
    });
  }

  public async validateUser(dto: UserDTO): Promise<UserDTO> {
    const { login } = dto;

    const user = await this.repository.findOne({ login });
    if (user) {
      return UserDTO.fromEntity(user);
    }
    return this.create(dto);
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.repository.update(userId, {
      has2FactorAuth: true,
    });
  }
}
