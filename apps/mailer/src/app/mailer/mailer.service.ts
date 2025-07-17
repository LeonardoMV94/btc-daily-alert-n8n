import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { handleResendResponse } from './handlers/resend.handler';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

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
        this.logger.log(`Email sent successfully: ${response.data.id}`);
        return response.data;
      }
      this.logger.error(`Error sending email: ${response.status}`, response.data);
      handleResendResponse(response.status, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Error sending email: ${error.response?.status}`, error.response?.data);
        throw new BadRequestException(error.response?.data);
      }
      this.logger.error(`Error sending email: ${JSON.stringify(error)}`);
      throw new BadRequestException(error);
    }
  }
}
