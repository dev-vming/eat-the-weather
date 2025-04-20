// app/api/post/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { CreatePostUsecase } from '@/application/usecases/post/CreatePostUsecase';
import { GetAllPostsUsecase } from '@/application/usecases/post/GetAllPostsUsecase';
import { PostCreateDto } from '@/application/usecases/post/dto/PostCreateDto';
import { PostGetAllRequestDto } from '@/application/usecases/post/dto/PostGetAllRequestDto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const dto: PostCreateDto = {
      user_id: body.user_id,
      region_id: body.region_id,
      content: body.content,
      post_image: body.post_image ?? 'default',
      temperature_sensitivity: body.temperature_sensitivity,
      has_outfit_tag: body.has_outfit_tag ?? false,
      has_weather_tag: body.has_weather_tag ?? false,
    };

    const createdPost = await CreatePostUsecase(SbPostRepository, dto);

    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const dto: PostGetAllRequestDto = {
      region_id: searchParams.get('region_id') ?? undefined,
      user_id: searchParams.get('user_id') ?? undefined,
      order_by:
        (searchParams.get('order_by') as 'created_at' | 'like_count') ??
        undefined,
      ascending:
        searchParams.get('ascending') === 'true'
          ? true
          : searchParams.get('ascending') === 'false'
            ? false
            : undefined,
      tag_ids: searchParams.getAll('tag_ids'), // 배열 형태로 받을 경우
      only_sensitive_match: searchParams.get('only_sensitive_match') === 'true',
      my_temperature_sensitivity: searchParams.get('my_temperature_sensitivity')
        ? Number(searchParams.get('my_temperature_sensitivity'))
        : undefined,
      has_outfit_tag:
        searchParams.get('has_outfit_tag') === 'true'
          ? true
          : searchParams.get('has_outfit_tag') === 'false'
            ? false
            : undefined,
      has_weather_tag:
        searchParams.get('has_weather_tag') === 'true'
          ? true
          : searchParams.get('has_weather_tag') === 'false'
            ? false
            : undefined,
      limit: searchParams.get('limit')
        ? Number(searchParams.get('limit'))
        : undefined,
    };

    const posts = await GetAllPostsUsecase(SbPostRepository, dto);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
