import { Test, TestingModule } from '@nestjs/testing';
import { BinanceTokenService } from './binance-token.service';

describe('BinanceTokenService', () => {
  let service: BinanceTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceTokenService],
    }).compile();

    service = module.get<BinanceTokenService>(BinanceTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
