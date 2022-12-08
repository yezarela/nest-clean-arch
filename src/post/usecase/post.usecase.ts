import { NotFoundException, ConflictException } from '../../domain/errors';
import { Post, PostRepository } from '../../domain/post';

export class PostUsecase {
  constructor(private postRepository: PostRepository) {}

  hello() {
    return 'hello';
  }

  listPosts(limit: number, offset: number): Promise<Post[]> {
    return this.postRepository.list(limit, offset);
  }

  async getPostById(id: string): Promise<Post> {
    const result = await this.postRepository.get(id);
    if (!result) {
      throw new NotFoundException('Post not found');
    }

    return result;
  }

  async createPost(data: Post): Promise<Post> {
    const exist = await this.postRepository.getByTitle(data.title);
    if (exist) {
      throw new ConflictException('Post with given title already exist');
    }

    return this.postRepository.create(data);
  }

  async updatePost(data: Post): Promise<Post> {
    const exist = await this.postRepository.get(data.id);
    if (!exist) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.update(data);
  }

  async deletePost(id: string): Promise<void> {
    const exist = await this.postRepository.get(id);
    if (!exist) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.delete(id);
  }
}
