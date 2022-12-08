export class Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export interface PostRepository {
  list(limit: number, offset: number): Promise<Post[]>;
  get(id: string): Promise<Post>;
  getByTitle(title: string): Promise<Post>;
  create(data: Post): Promise<Post>;
  update(data: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
