import { CreatePostRequestDto } from './dto/PostDto.ts';
import { PostRepository } from '@/domain/repositories/PostRepository';

export const CreatePostUsecase = async (
  postRepository: PostRepository,
  postData: CreatePostRequestDto
) => {
  const newPost = await postRepository.create(postData);
  return newPost;
};
