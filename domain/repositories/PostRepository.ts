import { PostCreateDto } from '@/application/usecases/post/dto/PostCreateDto';
import { Post } from '../entities/Post';
import { PostFilter } from './filters/PostFilter';

export interface PostRepository {
  create(post: PostCreateDto): Promise<Post>;
  update(post: Post): Promise<void>;
  delete(postId: string): Promise<void>;

  getById(postId: string): Promise<Post | null>;
  getAll(filter: PostFilter): Promise<Post[]>;

  getByUserId(userId: string): Promise<Post[]>;
  getPopular(regionId?: string, limit?: number): Promise<Post[]>;
}
