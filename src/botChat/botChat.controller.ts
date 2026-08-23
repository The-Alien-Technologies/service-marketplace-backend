import { Body, Controller, Post } from "@nestjs/common";
import { BotChatService } from "./botChat.service";
import { Public } from 'src/common/decorators/is-public.decorator';
import { ResponseUtil } from "src/common/utils/response.util";
import {ClientBotResponseDto} from './dto/client-response.dto'
import { BotChatResponseDto } from "./dto/bot-response.dto";


@Public()
@Controller('support')
export class BotChatController {
    constructor(private botChatService : BotChatService) {
    }
    @Post('bot')
    async botController (@Body() clientBotResponseDto : ClientBotResponseDto) : Promise <BotChatResponseDto> {
       try{
        const { prompt, conversationId } = clientBotResponseDto;
        const response = await this.botChatService.sendMessage(prompt, conversationId);
        console.log(response)
        return {
            id: response.id,
            message: response.message
        };

       }catch(error){
        throw error
       }
    }
}
