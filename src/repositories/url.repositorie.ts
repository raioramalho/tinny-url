/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable, Logger } from '@nestjs/common';
import { UrlEntity } from 'src/entities/url.entity';
import { Repositorie } from 'src/interfaces/repositorie.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UrlRepositorie implements Repositorie<UrlEntity> {
  private readonly logger = new Logger(UrlRepositorie.name);
  constructor(
    @InjectModel(UrlEntity.name) private urlModel: Model<UrlEntity>,
  ) {}
  async getOneById(id: string): Promise<UrlEntity> {
    this.logger.verbose(this.getOneById.name);
    return await this.urlModel.findById(id);
  }
  async getAll(): Promise<UrlEntity[]> {
    this.logger.verbose(this.getAll.name);
    return await this.urlModel.find();
  }
  async getOneByColumn(column: string, value: any): Promise<UrlEntity> {
    this.logger.verbose(this.getOneByColumn.name);
    return await this.urlModel.findOne({ [column]: value });
  }

  async create({ url, tinnyUrl }: any): Promise<UrlEntity> {
    this.logger.verbose(this.create.name);
    const createdUrl = new this.urlModel({
      url,
      tinnyUrl,
    });    
    return await createdUrl.save();
  }
}
