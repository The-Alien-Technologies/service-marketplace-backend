import { IsString, IsUUID, Length } from "class-validator"


export class ClientBotResponseDto {
    @IsString()
    @Length(1, 200)
    prompt: string

    @IsUUID()
    conversationId: string
}