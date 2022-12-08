import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './database/mysql/post.entity';
import { PostMysqlRepository } from './database/mysql/post.repository';
import { PostController } from './delivery/http/post.controller';
import { PostUsecase } from './usecase/post.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [
    PostMysqlRepository,
    {
      provide: 'POST_USECASE',
      useFactory: (postRepo: PostMysqlRepository) => new PostUsecase(postRepo),
      inject: [PostMysqlRepository],
    },
  ],
})
export class PostModule {}
