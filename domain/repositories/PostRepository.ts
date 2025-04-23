import { PostCreateDto } from '@/application/usecases/post/dto/PostCreateDto';
import { Post } from '../entities/Post';
import { PostFilter } from './filters/PostFilter';
import { PostView } from '../entities/PostView';

export interface PostRepository {
  create(post: PostCreateDto): Promise<Post>;
  update(post: Post): Promise<void>;
  delete(postId: string): Promise<void>;

  getById(postId: string): Promise<PostView>;
  getAll(filter: PostFilter): Promise<PostView[]>;

  getByUserId(userId: string): Promise<Post[]>;
  getPopular(regionId?: string, limit?: number): Promise<Post[]>;
}
