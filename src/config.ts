import { IsNumberString, IsString } from 'class-validator';

export class Config {
  @IsString()
  MYSQL_HOST: string;

  @IsNumberString()
  MYSQL_PORT: string;

  @IsString()
  MYSQL_USERNAME: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;
}
