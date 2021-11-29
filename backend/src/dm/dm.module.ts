import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DmEntity } from "../model/dm.entity";
import { DmService } from "./dm.service";
import { DmController } from "./dm.controller";
import { UserModule } from "../user/user.module";
import { ConversationModule } from "../conversation/conversation.module";

@Module({
  imports: [
    UserModule,
    ConversationModule,
    TypeOrmModule.forFeature([DmEntity]),
  ],
  providers: [DmService],
  controllers: [DmController],
  exports: [],
})
export class DmModule {}
