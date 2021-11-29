import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConversationEntity } from "../model/conversation.entity";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ConversationEntity])],
  providers: [ConversationService],
  controllers: [ConversationController],
  exports: [ConversationService],
})
export class ConversationModule {}
