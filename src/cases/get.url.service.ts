import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlRepositorie } from 'src/repositories/url.repositorie';

@Injectable()
export class GetUrlService {
  private readonly logger = new Logger(GetUrlService.name);
  constructor(private readonly urlRepositorie: UrlRepositorie) {}

  async execute(tinnyUrl: string): Promise<UrlEntity> {
    this.logger.verbose(this.execute.name);
    try {
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
      return url;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
