import { Injectable } from "@nestjs/common";
import { llmClient } from "./llm/client";
import * as fs from 'fs';
import * as path from 'path';
import { conversationRepository } from "./botChat.repository";

// import template from './prompt/chatbot.txt'

const promptDir = path.join(__dirname, 'prompt');

const template = fs.readFileSync(path.join(promptDir, 'chatbot.txt'), 'utf8');
const pavodahInfo = fs.readFileSync(path.join(promptDir, 'Pavodah.md'), 'utf8');

const instructions= template.replace('{{pavodahInfo}}', pavodahInfo);



type ChatResponse  = {
    id: string
    message: string
}

@Injectable()
export class BotChatService {
    async sendMessage(prompt: string, conversationId: string) : Promise <ChatResponse>{
        const response = await llmClient.generateText({
            instructions,
            model: 'gpt-4o-mini',
            prompt,
            temperature: 0.2,
            maxToken: 140,
            previousResponseId: conversationRepository.getLastResponseId(conversationId)
        });
        conversationRepository.setLastResponseId(conversationId, response.id);
        return {
            id: response.id,
            message: response.text
        }
    }

}