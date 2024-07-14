import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClickUrlService } from 'src/cases/click.url.service';
import { UrlEntity } from 'src/entities/url.entity';

@Injectable()
export class UrlEvents {
  private readonly logger = new Logger(UrlEvents.name);
  constructor(private readonly clickUrlService: ClickUrlService) {}

  @OnEvent('url.clicked')
  async handleUrlClicked(url: UrlEntity) {
    this.logger.debug(`Counting clicks for ${url.tinnyUrl}`);
    await this.clickUrlService.execute(url);
  }
}
