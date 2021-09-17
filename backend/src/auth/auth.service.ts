import { Injectable } from "@nestjs/common";
import { TokenPayload } from "./tokenPayload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "@src/model/user.entity";
import { JwtPayload } from "./utils/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public login(user: UserEntity) {
    const payload: JwtPayload = { userId: user.id, username: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }
}
