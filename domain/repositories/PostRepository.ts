import { CreatePostRequestDto } from '@/application/usecases/post/dto/PostDto.ts';
import { Post } from '../entities/Post';
import { PostFilter } from './filters/PostFilter';
import { PostView } from '../entities/PostView';
import { UpdatePostRequestDto } from '@/application/usecases/post/dto/UpdatePostDto';

export interface PostRepository {
  create(post: CreatePostRequestDto): Promise<Post>;
  update(dto: UpdatePostRequestDto): Promise<void>;
  delete(postId: string): Promise<void>;

  getById(postId: string, userId: string): Promise<PostView>;
  getAll(filter: PostFilter): Promise<PostView[]>;

  getLikedPostsByUser(user_id: string): Promise<PostView[]>;
  /** 특정 사용자가 작성한 게시물 목록 조회 */
  getPostsByUser(user_id: string): Promise<PostView[]>;

  getByUserId(userId: string): Promise<Post[]>;
}
