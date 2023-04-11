import { Module } from '@nestjs/common';
import { BinanceTokenService } from './binance-token.service';
import { BinanceTokenController } from './binance-token.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BinanceTokenController],
  providers: [BinanceTokenService],
})
export class BinanceTokenModule {}
