import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';

@Injectable()
export class PlaywrightService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser | null = null;
  
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const headless = this.configService.get('PLAYWRIGHT_HEADLESS');
    this.browser = await chromium.launch({
      headless: headless === 'true',
      args: ['--no-sandbox'],
    });
    console.log('[Playwright] Browser launched');
  }

  async onModuleDestroy() {
    await this.browser?.close();
    console.log('[Playwright] Browser closed');
  }

  getBrowser(): Browser {
    if (!this.browser) {
      throw new Error('Browser is not initialized');
    }
    return this.browser;
  }
}