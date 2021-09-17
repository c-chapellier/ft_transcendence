import { Module } from "@nestjs/common";
import { UserEntity } from "../model/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { TwoFactorAuthenticationService } from "./two-factor-authentication.service";
import { TwoFactorAuthenticationController } from "./two-factor-authentication.controller";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [TwoFactorAuthenticationService],
  controllers: [TwoFactorAuthenticationController],
  exports: [],
})
export class TwoFactorAuthenticationModule {}

// @Module({
// 	imports: [TypeOrmModule.forFeature([UserEntity])],

//   })
//   export class UserModule { }
