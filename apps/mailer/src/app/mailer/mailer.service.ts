import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { handleResendResponse } from './handlers/resend.handler';

@Injectable()
export class MailerService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async sendEmail(email: CreateMailerDto): Promise<{ id: string } | undefined> {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    try {
      const observableResponse: Observable<AxiosResponse<{ id: string }>> =
        this.httpService.post('https://api.resend.com/emails', email, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          validateStatus: () => true,
        });
      const response = await firstValueFrom(observableResponse);

      if (response.status === 200) {
        return response.data;
      }
      handleResendResponse(response.status, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new BadRequestException(error.response?.data);
      }
      throw new BadRequestException(error.message);
    }
  }
}
