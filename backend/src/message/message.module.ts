import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "../model/message.entity";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { UserModule } from "../user/user.module";
import { ChannelModule } from "../channel/channel.module";

@Module({
  imports: [
    UserModule,
    ChannelModule,
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [],
})
export class MessageModule {}
