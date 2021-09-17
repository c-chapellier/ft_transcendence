import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { Auth42Guard, AuthenticateGuard } from "./guard/auth.guard";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RequestWithUser } from "@src/two-factor-authentication/requestWithUser.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Get /auth/login
   * This is the url the user will use to login
   */
  @Get("login")
  @UseGuards(Auth42Guard)
  //    Guard("auth42"))
  login() {
    return;
  }

  /**
   * Get /auth/redirect
   * This is the redirect URL the OAUTH2 provider will call
   */

  @Get("redirect")
  //   @UseGuards(AuthGuard("auth42"))
  @UseGuards(Auth42Guard)
  async redirect(
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser
  ) {
    const token = this.authService.login(req.user);
    res.cookie("access_token", token.access_token, {
      httpOnly: false,
    });

    // EFFECTUER UNE REDIRECTION VERS LE 2FA SI CE DERNIER EST ACTIF

    // if (req.user.has2FactorAuth)
    // {
    // 	res.status(302).redirect("http://localhost:3001/2fa/")
    // }

    if (req.user.has2FactorAuth === false) {
      res.cookie("two_factor_auth", true, { httpOnly: false });
    }
    res.status(302).redirect("/");
    // res.send(200);
  }

  /**
   * Get auth/status
   * Retrieve the auth status
   */

  @Get("status")
  @UseGuards(AuthenticateGuard)
  status(@Req() req: Request) {
    // console.log(req);
    console.log(req.cookies);
    return req.user;
  }

  /**
   * Get auth/logout
   * Logging the user out
   */

  @Get("logout")
  logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    req.logout();
    res.clearCookie("two_factor_auth");
    res.redirect("/auth/status");
  }
}
