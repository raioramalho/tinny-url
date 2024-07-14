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

  constructor(id?: string, url?: string, tinnyUrl?: string) {
    this.id = id;
    this.tinnyUrl = tinnyUrl;
    this.url = url;
  }
}

export type UrlEntityDocument = HydratedDocument<UrlEntity>;
export const UrlEntitySchema = SchemaFactory.createForClass(UrlEntity);
