// app/api/posts/my/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GetMyPostsUsecase } from '@/application/usecases/post/GetMyPostsUsecase';
import { GetMyPostsRequestDto } from '@/application/usecases/post/dto/GetMyPostsDto';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';

export async function GET(req: NextRequest) {
  try {
    const user_id = req.headers.get('x-user-id') ?? '';

    if (!user_id) {
      return NextResponse.json(
        { message: 'user_id가 없습니다.' },
        { status: 400 }
      );
    }

    const dto: GetMyPostsRequestDto = { user_id };
    const posts = await GetMyPostsUsecase(SbPostRepository, dto);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.error('내가 작성한 게시물 조회 실패:', error);
    return NextResponse.json(
      { message: error.message || '서버 오류' },
      { status: 500 }
    );
  }
}
