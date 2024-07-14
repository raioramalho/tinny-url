import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
