import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class UrlEntity {
  @Prop()
  tinnyUrl: string;
  @Prop()
  url: string;
  @Prop()
  id?: string;

  @Prop()
  clicks?: number;

  constructor(id?: string, url?: string, tinnyUrl?: string) {
    this.id = id;
    this.tinnyUrl = tinnyUrl;
    this.url = url;
    this.clicks = 0;
  }
}

export type UrlEntityDocument = HydratedDocument<UrlEntity>;
export const UrlEntitySchema = SchemaFactory.createForClass(UrlEntity);
