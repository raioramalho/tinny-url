import { UrlEntity } from 'src/entities/url.entity';

export interface Repositorie<T> {
  create(data: any): Promise<T>;
  getOneById(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  getOneByColumn(column: string, value: any): Promise<T>;
  click(url: UrlEntity): Promise<UrlEntity>;
}
