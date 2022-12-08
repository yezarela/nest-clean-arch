import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostRepository } from '../../../domain/post';
import { PostEntity } from './post.entity';

@Injectable()
export class PostMysqlRepository implements PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async list(limit: number, offset: number): Promise<Post[]> {
    const result = await this.postRepository.find({
      take: limit,
      skip: offset,
    });

    return result.map(this.mapPost);
  }

  async get(id: string): Promise<Post> {
    const result = await this.postRepository.findOne({
      where: { id },
    });

    return this.mapPost(result);
  }

  async getByTitle(title: string): Promise<Post> {
    const result = await this.postRepository.findOne({
      where: { title },
    });

    return this.mapPost(result);
  }

  async create(data: Post): Promise<Post> {
    const result = await this.postRepository.create({
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    });

    return this.mapPost(result);
  }

  async update(data: Post): Promise<Post> {
    await this.postRepository.findOneOrFail({
      where: { id: data.id },
    });

    await this.postRepository.update(
      {
        id: data.id,
      },
      {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    );

    const result = await this.postRepository.findOne({
      where: { id: data.id },
    });

    return this.mapPost(result);
  }

  async delete(id: string): Promise<void> {
    await this.postRepository.findOneOrFail({
      where: { id },
    });

    await this.postRepository.delete(id);
  }

  private mapPost(data: PostEntity): Post {
    return new Post(
      data.id,
      data.title,
      data.content,
      data.authorId,
      data.createdAt,
      data.updatedAt,
    );
  }
}
