/* eslint-disable prefer-const */
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ShortenUrlDto } from 'src/dto/shorten.url.dto';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlRepositorie } from 'src/repositories/url.repositorie';

@Injectable()
export class ShortenUrlService {
  private readonly logger = new Logger(ShortenUrlService.name);
  constructor(private readonly urlRepositorie: UrlRepositorie) {}

  async execute(shortenUrlDto: ShortenUrlDto): Promise<UrlEntity> {
    this.logger.verbose(this.execute.name);
    try {
      let check = await this.urlRepositorie.getOneByColumn(
        'url',
        shortenUrlDto.url,
      );

      if (check) {
        check['tinnyUrl'] = `http://localhost:3000/${check.tinnyUrl}`;
        return check;
      }

      const url = {
        url: shortenUrlDto.url.split('https://')[1] || shortenUrlDto.url,
        tinnyUrl: `${this.generateCodeForShortenUrl()}`,
      };

      let data = await this.urlRepositorie.create(url);
      data['tinnyUrl'] = `http://localhost:3000/${data.tinnyUrl}`;
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  generateCodeForShortenUrl(): string {
    this.logger.verbose(this.generateCodeForShortenUrl.name);
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    const comprimentoCodigo = 5; // comprimento desejado do código

    for (let i = 0; i < comprimentoCodigo; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }

    return codigo;
  }
}
