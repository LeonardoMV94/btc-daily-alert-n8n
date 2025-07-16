import { Injectable } from '@nestjs/common';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import type { AxiosResponse } from 'axios';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async sendMessage(createTelegramBotDto: CreateTelegramBotDto) {
    const botToken = this.configService.get('TELEGRAM_BOT_TOKEN');
    const { text, chatId } = createTelegramBotDto;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const observableResponse: Observable<AxiosResponse<any>> =
      this.httpService.post(url, {
        chat_id: chatId,
        text: text,
      });
    const response = await firstValueFrom(observableResponse);
    return response.data;
  }
}
