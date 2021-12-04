import { Strategy } from "passport-oauth2";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../model/user.entity";
import { UserService } from "../../user/user.service";
import { UserDTO } from "../../user/dto/user.dto";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, "auth42") {
  constructor(
    private http: HttpService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {
    super({
      authorizationURL:
        "https://api.intra.42.fr/oauth/authorize?client_id=da2dcd376acb7bbfa61dc009248e6d317a7e0d29d8908f77ded3016c7dd89f42&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fredirect&response_type=code",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID: process.env.OAUTH_42_CLIENT_ID,
      clientSecret: process.env.OAUTH_42_SECRET,
      callbackURL: process.env.OAUTH_42_REDIRECT_URL,
      scope: ["public"],
    });
  }

  //   async validate(accessToken: string): Promise<{ myAccessToken: string }> {
  async validate(accessToken: string): Promise<UserDTO> {
    const { data } = await this.http
      .get("https://api.intra.42.fr/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();

    const { login, email, id, displayname, image_url } = data;
    console.log(login, email, id, displayname, image_url);
    console.log(accessToken);

    let userEntity: UserEntity = new UserEntity();

    userEntity.avatar = image_url;
    userEntity.login = login;
    userEntity.name = displayname;
    userEntity.email = email;
    userEntity.description = " ";

    const userDTO: UserDTO = UserDTO.fromEntity(userEntity);

    const userService = new UserService(this.repository);
    const user = await userService.validateUser(userDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
