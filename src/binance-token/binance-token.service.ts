import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BinanceTokenService {
  constructor(private httpService: HttpService) {}

  async getTokenList(): Promise<any> {
    const response = await this.httpService
      //   .get('https://api.binance.com/api/v3/ticker/24hr')
      .get(
        'https://www.binance.com/exchange-api/v2/public/asset-service/product/get-products',
      )
      //   .get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
      .toPromise();

    const tokenList = response.data.data
      .filter((token) => token.s.endsWith('USDT') || token.s.endsWith('BUSD'))
      .map((tokenData) => {
        const marketCap = tokenData.c * tokenData.cs;
        return {
          symbol: tokenData.s,
          marketCap,
        };
      });
    const lowCap = tokenList.sort(
      (a, b) => parseFloat(a.marketCap) - parseFloat(b.marketCap),
    );
    return lowCap;
  }

  async getLowCapTokens(): Promise<any> {
    try {
      const response = await this.httpService
        //   .get('https://api.binance.com/api/v3/ticker/24hr')
        .get(
          'https://www.binance.com/exchange-api/v2/public/asset-service/product/get-products',
        );

      const tokens = await firstValueFrom(response);

      const tokenList = tokens.data.data
        .filter(
          (token) =>
            !!token.cs &&
            !!token.c &&
            (token.s.endsWith('USDT') || token.s.endsWith('BUSD')),
        )
        .map((tokenData) => {
          const marketCap = tokenData.c * tokenData.cs;
          return {
            symbol: tokenData.s,
            marketCap,
            c: tokenData.c,
            cs: tokenData.cs,
          };
        });
      const lowCap = tokenList.sort(
        (a, b) => parseFloat(a.marketCap) - parseFloat(b.marketCap),
      );
      return lowCap;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getTokenMarketCap(symbol) {
    try {
      const ticker = await this.httpService
        .get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
        .toPromise();
      const price = ticker.data.price;
      const tokenInfo = await this.httpService
        .get(`https://api.binance.com/api/v3/tokenInfo?symbol=${symbol}`)
        .toPromise();
      const circulatingSupply = tokenInfo.data.circulatingSupply;

      return price * circulatingSupply;
    } catch (error) {
      console.error(error);
    }
  }

  async getTokenFundingFee() {
    try {
      const result = await this.httpService
        .get('https://fapi.binance.com/fapi/v1/fundingRate')
        .toPromise();
      const fundingFees = result.data;
      const positive = fundingFees
        .filter((f) => f.fundingRate >= 0)
        .sort((a, b) => parseFloat(b.fundingRate) - parseFloat(a.fundingRate));
      const negative = fundingFees
        .filter((f) => f.fundingRate < 0)
        .sort((a, b) => parseFloat(a.fundingRate) - parseFloat(b.fundingRate));

      return { positive, negative };
    } catch (error) {
      console.error(error);
    }
  }
}
