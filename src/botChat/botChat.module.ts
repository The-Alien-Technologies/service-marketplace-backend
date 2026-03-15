import { Module } from "@nestjs/common";
import { BotChatController } from "./botChat.controller";
import { BotChatService } from "./botChat.service";

@Module({
    controllers: [BotChatController],
    providers: [BotChatService],
    exports: [BotChatService],
})
export class BotChatModule {}