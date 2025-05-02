// app/api/posts/liked/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { GetLikedPostsUsecase } from '@/application/usecases/post/GetLikedPostsUsecase';
import { GetLikedPostsRequestDto } from '@/application/usecases/post/dto/GetLikedPostsDto';

export async function GET(req: NextRequest, userId: string) {
  try {
    // 쿼리스트링 또는 헤더에서 user_id 가져오기
    const user_id = req.headers.get('x-user-id') ?? '';

    if (!user_id) {
      return NextResponse.json(
        { message: 'user_id가 없습니다.' },
        { status: 400 }
      );
    }

    const dto: GetLikedPostsRequestDto = { user_id };
    const posts = await GetLikedPostsUsecase(SbPostRepository, dto);
    console.log('좋아요 게시물 조회 성공:', posts);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.error('좋아요 게시물 조회 실패:', error);
    return NextResponse.json(
      { message: error.message || '서버 오류' },
      { status: 500 }
    );
  }
}
