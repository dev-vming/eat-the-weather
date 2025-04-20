// app/api/post/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { CreatePostUsecase } from '@/application/usecases/post/CreatePostUsecase';
import { PostCreateDto } from '@/application/usecases/post/dto/PostCreateDto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 인증된 유저 정보가 들어온다고 가정 (미들웨어 or 헤더 or 세션)
    const {
      user_id,
      region_id,
      content,
      post_image,
      temperature_sensitivity,
      has_outfit_tag,
      has_weather_tag,
    } = body;

    const dto: PostCreateDto = {
      user_id,
      region_id,
      content,
      post_image,
      temperature_sensitivity,
      has_outfit_tag,
      has_weather_tag,
    };

    const createdPost = await CreatePostUsecase(SbPostRepository, dto);

    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (error: any) {
    const errorMessage = error.message || '알 수 없는 에러가 발생했습니다';
    const errorStack = error.stack || '스택 추적 정보를 사용할 수 없습니다';
    return NextResponse.json(
      {
        message: `게시글 생성 중 에러 발생: ${errorMessage}`,
        details: errorStack,
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {}
