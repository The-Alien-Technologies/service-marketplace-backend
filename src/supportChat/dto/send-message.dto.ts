import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SendSupportMessageDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20000)
    content: string;
}