import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../model/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void
  ) {
    done(null, user);
  }

  async deserializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void
  ) {
    const id: string = user.id;
    const userDb = await this.userRepository.findOne({ id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
