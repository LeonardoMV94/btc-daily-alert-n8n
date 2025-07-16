import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { BullModule } from '@nestjs/bullmq';
import { MailerProcessor } from './mailer.processor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    HttpModule,
  ],
  controllers: [MailerController],
  providers: [MailerService, MailerProcessor],
})
export class SendMailerModule {}
