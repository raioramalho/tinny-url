import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ShortenUrlService } from './cases/shorten.url.service';
import { GetUrlService } from './cases/get.url.service';
import { ShortenUrlDto } from './dto/shorten.url.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly shortenUrlService: ShortenUrlService,
    private readonly getUrlService: GetUrlService,
  ) {}

  @Get()
  app() {
    return { status: 'ok' };
  }

  @Post()
  shortenAUrl_route(@Req() request: any, @Body() body: ShortenUrlDto) {
    this.logger.verbose(this.shortenAUrl_route.name);
    return this.shortenUrlService.execute(body);
  }

  @Get(':tinnyUrl')
  async getUrl_route(
    @Res() response: Response,
    @Param('tinnyUrl') tinnyUrl: string,
  ) {
    this.logger.verbose(this.getUrl_route.name);
    const url = await this.getUrlService.execute(tinnyUrl);
    return response.redirect(`https://${url.url}`);
  }
}
