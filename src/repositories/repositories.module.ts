import { Module } from '@nestjs/common';
import { UrlRepositorie } from './url.repositorie';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlEntity, UrlEntitySchema } from 'src/entities/url.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: UrlEntity.name,
        schema: UrlEntitySchema,
      },
    ]),
  ],
  providers: [UrlRepositorie],
  exports: [UrlRepositorie],
})
export class RepositoriesModule {}
