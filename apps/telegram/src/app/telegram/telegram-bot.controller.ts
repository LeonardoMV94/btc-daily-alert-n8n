import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';

@Controller('telegram')
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Post('send-message')
  create(@Body() createTelegramBotDto: CreateTelegramBotDto) {
    return this.telegramBotService.sendMessage(createTelegramBotDto);
  }
}
