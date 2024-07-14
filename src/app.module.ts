import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { GetUrlService } from './cases/get.url.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { ShortenUrlService } from './cases/shorten.url.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // CacheModule.register(),
    MongooseModule.forRoot(`${process.env.NESTJS_MONGODB_URL}`),
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    ShortenUrlService,
    GetUrlService,
  ],
})
export class AppModule {}
