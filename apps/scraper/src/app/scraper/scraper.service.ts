import { Injectable } from '@nestjs/common';
import { PlaywrightService } from '../playwright/playwright.service';

@Injectable()
export class ScraperService {
  constructor(private readonly playwrightService: PlaywrightService) {}

  async findFearAndGreedIndex() {
    // https://alternative.me/crypto/fear-and-greed-index/

    const url = 'https://alternative.me/crypto/fear-and-greed-index/';
    // const xpath = '//*[@id="main"]/section/div/div[3]/div[2]/div/div'
    const browser = this.playwrightService.getBrowser();
    const page = await browser.newPage();

    await page.goto(url);
    const fearAndGreedIndex = await page.$$eval('.fng-value', nodes => {
      const result: Record<string, number> = {};

      nodes.forEach(node => {
        const label = node.querySelector('.gray')?.textContent?.trim() || '';
        // El número está dentro de un div con clase fng-circle dentro del nodo actual
        const valueText = node.querySelector('.fng-circle')?.textContent?.trim() || '';
        const value = parseInt(valueText, 10);

        if (label && !isNaN(value)) {
          result[label] = value;
        }
      });

      return result;
    });
    console.log(fearAndGreedIndex);
    if (fearAndGreedIndex === null) {
      throw new Error('Fear and Greed Index not found');
    }
    await page.close();
    return {
      ...fearAndGreedIndex,
      image: 'https://alternative.me/crypto/fear-and-greed-index.png',
    };
  }
}
