import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTelegramBotDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsNumber()
  @IsNotEmpty()
  chatId!: number;
}
