import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { GetUrlService } from './cases/get.url.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { ShortenUrlService } from './cases/shorten.url.service';
import { EventsModule } from './events/events.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    RepositoriesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [ShortenUrlService, GetUrlService],
})
export class AppModule {}
