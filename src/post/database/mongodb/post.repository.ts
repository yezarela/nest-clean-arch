import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostRepository } from '../../../domain/post';
import { PostDocument, PostModel } from './post.model';

@Injectable()
export class PostMongoDBRepository implements PostRepository {
  constructor(
    @InjectModel(PostModel.name)
    private postModel: Model<PostDocument>,
  ) {}

  async list(limit: number, offset: number): Promise<Post[]> {
    const result = await this.postModel.find().limit(limit).skip(offset).lean();

    return result.map(this.mapPost);
  }

  async get(id: string): Promise<Post> {
    const result = await this.postModel.findOne({ _id: id }).lean();

    return this.mapPost(result);
  }

  async getByTitle(title: string): Promise<Post> {
    const result = await this.postModel.findOne({ title }).lean();

    return this.mapPost(result);
  }

  async create(data: Post): Promise<Post> {
    const result = await this.postModel.create({
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    });

    return this.mapPost(result);
  }

  async update(data: Post): Promise<Post> {
    const result = await this.postModel.findOneAndUpdate(
      {
        _id: data.id,
      },
      {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    );

    return this.mapPost(result);
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findOneAndRemove({ _id: id });
  }

  private mapPost(data: PostModel): Post {
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
