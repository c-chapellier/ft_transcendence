import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class Auth42Guard extends AuthGuard("auth42") {
  async canActivate(contexte: ExecutionContext): Promise<any> {
    const activate = (await super.canActivate(contexte)) as boolean;
    const request = contexte.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log("Guard: ", req.isAuthenticated());
    return req.isAuthenticated();
  }
}
