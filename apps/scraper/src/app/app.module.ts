import { Module } from '@nestjs/common';
import { ScraperModule } from './scraper/scraper.module';
import { PlaywrightModule } from './playwright/playwright.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScraperModule,
    PlaywrightModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
