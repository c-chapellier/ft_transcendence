import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelEntity } from "../model/channel.entity";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ChannelEntity])],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService],
})
export class ChannelModule {}
