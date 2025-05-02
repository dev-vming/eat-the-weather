import { NextRequest, NextResponse } from 'next/server';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { GetAllPostsUsecase } from '@/application/usecases/post/GetAllPostsUsecase';
import { GetAllPostsQueryDto } from '@/application/usecases/post/dto/GetAllPostsQueryDto';
import { PostFilter } from '@/domain/repositories/filters/PostFilter';
import { CreatePostRequestDto } from '@/application/usecases/post/dto/PostDto.ts';
import { CreatePostUsecase } from '@/application/usecases/post/CreatePostUsecase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const queryDto: GetAllPostsQueryDto = {
      region_id: searchParams.get('region_id') ?? undefined,
      user_id: searchParams.get('user_id') ?? undefined,
      order_by:
        (searchParams.get('order_by') as 'created_at' | 'like_count') ??
        'created_at',
      only_sensitive_match: searchParams.get('only_sensitive_match') === 'true',
      my_temperature_sensitivity: searchParams.get('my_temperature_sensitivity')
        ? Number(searchParams.get('my_temperature_sensitivity'))
        : undefined,
      has_outfit_tag:
        searchParams.get('has_outfit_tag') === 'true' ? true : undefined,
      has_weather_tag:
        searchParams.get('has_weather_tag') === 'true' ? true : undefined,
      limit: 5,
      cursor: searchParams.get('cursor') ?? undefined,
    };

    const filter: PostFilter = { ...queryDto };

    const { posts, nextCursor } = await GetAllPostsUsecase(
      SbPostRepository,
      filter
    );

    return NextResponse.json({ posts, nextCursor }, { status: 200 });
  } catch (error: any) {
    console.error('게시글 목록 조회 실패:', error);
    return NextResponse.json(
      { message: error.message ?? '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const postData = body as CreatePostRequestDto;

    const newPost = await CreatePostUsecase(SbPostRepository, postData);

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error('[POST_CREATE_ERROR]', error);
    return NextResponse.json(
      { message: error.message ?? '게시글 생성 중 오류 발생' },
      { status: 500 }
    );
  }
}
