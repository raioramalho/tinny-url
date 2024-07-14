import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UrlEvents } from './url.events';
import { ClickUrlService } from 'src/cases/click.url.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    RepositoriesModule,
  ],
  providers: [UrlEvents, ClickUrlService],
  exports: [UrlEvents],
})
export class EventsModule {}
