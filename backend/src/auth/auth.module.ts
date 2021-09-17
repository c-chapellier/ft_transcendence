import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthStrategy } from "./strategy/auth.strategy";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SessionSerializer } from "./utils/serializer";
// import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../model/user.entity";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthStrategy, SessionSerializer, AuthService],
  controllers: [AuthController],
  exports: [AuthStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    HttpModule,
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class AuthModule {}
