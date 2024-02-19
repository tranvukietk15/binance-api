import { Test, TestingModule } from '@nestjs/testing';
import { BinanceTokenController } from './binance-token.controller';
import { BinanceTokenService } from './binance-token.service';

describe('BinanceTokenController', () => {
  let controller: BinanceTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinanceTokenController],
      providers: [BinanceTokenService],
    }).compile();

    controller = module.get<BinanceTokenController>(BinanceTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
