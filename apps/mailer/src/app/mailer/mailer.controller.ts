import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() createMailerDto: CreateMailerDto) {
    return this.mailerService.sendEmail(createMailerDto);
  }
}
