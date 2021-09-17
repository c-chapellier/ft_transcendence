import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Get,
  HttpCode,
  Body,
  UnauthorizedException,
} from "@nestjs/common";
import { TwoFactorAuthenticationService } from "./two-factor-authentication.service";
import { Response } from "express";
import { AuthenticateGuard } from "../auth/guard/auth.guard";
// import { RequestWithUser } from "./requestWithUser.interface";
import { TwoFactorAuthenticationDto } from "./dto/turnOnTwoFactorAuthentication.dto";
import { UserService } from "../user/user.service";

@Controller("2fa")
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly userService: UserService
  ) {}

  @Post("generate")
  @UseGuards(AuthenticateGuard)
  async register(@Res() response: Response, @Req() request) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        request.user
      );

    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl
    );
  }

  @Post("turn-on")
  @HttpCode(200)
  @UseGuards(AuthenticateGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationDto
  ) {
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user
      );
    if (!isCodeValid) {
      throw new UnauthorizedException("Wrong authentication code");
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id);
  }

  @Post("authenticate")
  @HttpCode(200)
  @UseGuards(AuthenticateGuard)
  async authenticate(
    @Req() request,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationDto
  ) {
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user
      );
    if (!isCodeValid) {
      throw new UnauthorizedException("Wrong authentication code");
    }

    // const accessTokenCookie =
    //   this.authenticationService.getCookieWithJwtAccessToken(
    //     request.user.id,
    //     true
    //   );

    // request.res.setHeader("Set-Cookie", [accessTokenCookie]);

    return request.user;
  }
}
