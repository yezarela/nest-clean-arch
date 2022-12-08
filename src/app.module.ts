import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validateClass } from './common/utils/class.util';
import { Config } from './config';
import { PostEntity } from './post/database/mysql/post.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => validateClass(config, Config),
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Config>) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: parseInt(configService.get<string>('MYSQL_PORT')),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [PostEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PostModule,
  ],
})
export class AppModule {}
