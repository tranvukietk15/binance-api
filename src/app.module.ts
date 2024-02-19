import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceTokenModule } from './binance-token/binance-token.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/src/fe-client/build'),
    }),
    HttpModule,
    BinanceTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
