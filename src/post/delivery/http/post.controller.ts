import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Post } from '../../../domain/post';
import { PostUsecase } from '../../usecase/post.usecase';

@Controller()
export class PostController {
  constructor(
    @Inject('POST_USECASE') private readonly postUsecase: PostUsecase,
  ) {}

  @Get('hello')
  hello() {
    return 'hello';
  }

  @Get('posts')
  listPosts(@Query() qs: Record<string, string>): Promise<Post[]> {
    const limit = parseInt(qs.limit) || 10;
    const offset = parseInt(qs.offset) || 0;

    return this.postUsecase.listPosts(limit, offset);
  }

  @Get('posts/:id')
  getById(@Param('id') id: string): Promise<Post> {
    return this.postUsecase.getPostById(id);
  }
}
