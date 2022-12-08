export type User = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserRepository {
  get(id: string): Promise<User>;
}
