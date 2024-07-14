import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlRepositorie } from 'src/repositories/url.repositorie';

@Injectable()
export class ClickUrlService {
  private readonly logger = new Logger(ClickUrlService.name);
  constructor(private readonly urlRepositorie: UrlRepositorie) {}

  async execute(url: UrlEntity) {
    try {
      this.logger.verbose(this.execute.name);
      const click = await this.urlRepositorie.click(url);
      if (!click) {
        this.logger.error('Clicked state does not updated.');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
