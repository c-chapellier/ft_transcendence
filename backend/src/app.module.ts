import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelModule } from "./channel/channel.module";
import { configService } from "./config/config.service";
import { MessageModule } from "./message/message.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeORMSession } from "./model/session.entity";
// import { TwoFactorAuthenticationController } from "./two-factor-authentication/two-factor-authentication.controller";
// import { TwoFactorAuthenticationService } from "./two-factor-authentication/two-factor-authentication.service";
import { TwoFactorAuthenticationModule } from "./two-factor-authentication/two-factor-authentication.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    MessageModule,
    ChannelModule,
    AuthModule,
    TypeOrmModule.forFeature([TypeORMSession]),
    TwoFactorAuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
