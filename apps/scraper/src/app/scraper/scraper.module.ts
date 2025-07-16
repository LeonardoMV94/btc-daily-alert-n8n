import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { PlaywrightModule } from '../playwright/playwright.module';

@Module({
  imports: [PlaywrightModule],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
