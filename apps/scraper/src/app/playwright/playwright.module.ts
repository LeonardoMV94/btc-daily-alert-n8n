import { Module } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';

@Module({
  controllers: [],
  providers: [PlaywrightService],
  exports: [PlaywrightService],
})
export class PlaywrightModule {}
