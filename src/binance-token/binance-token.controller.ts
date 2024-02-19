import { Controller, Get } from '@nestjs/common';
import { BinanceTokenService } from './binance-token.service';

@Controller('binance-token')
export class BinanceTokenController {
  constructor(private readonly binanceTokenService: BinanceTokenService) {}

  @Get()
  async getTokens() {
    return await this.binanceTokenService.getTokenList();
  }

  @Get('low-cap')
  async getTokensLowCap() {
    return await this.binanceTokenService.getLowCapTokens();
  }

  @Get('funding')
  async getTokensFunding() {
    return await this.binanceTokenService.getTokenFundingFee();
  }
}
