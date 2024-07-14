/* eslint-disable prefer-const */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlRepositorie } from 'src/repositories/url.repositorie';

@Injectable()
export class GetUrlService {
  private readonly logger = new Logger(GetUrlService.name);
  constructor(
    private readonly urlRepositorie: UrlRepositorie,
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(tinnyUrl: string): Promise<UrlEntity> {
    this.logger.verbose(this.execute.name);
    try {
      let check: any = await this.cacheManager.get(tinnyUrl);

      if (check) {
        this.logger.verbose('Cache hit');
        this.eventEmitter.emit('url.clicked', check);
        return check;
      }

      const url = await this.urlRepositorie.getOneByColumn(
        'tinnyUrl',
        tinnyUrl,
      );
      if (!url) {
        throw new HttpException(
          'Url não encontrada ou expirada.',
          HttpStatus.NOT_FOUND,
        );
      }

      this.cacheManager.set(tinnyUrl, url);
      this.eventEmitter.emit('url.clicked', url);
      return url;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
