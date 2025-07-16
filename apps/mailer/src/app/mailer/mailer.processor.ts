import { WorkerHost, Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';

@Processor('mail-queue')
export class MailerProcessor extends WorkerHost {
  constructor(private mailerService: MailerService) {
    super();
  }

  async process(job: Job<CreateMailerDto>) {
    return this.mailerService.sendEmail(job.data);
  }
}
