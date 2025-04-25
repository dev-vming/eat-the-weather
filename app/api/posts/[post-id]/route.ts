// app/api/posts/[post-id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GetPostByIdUsecase } from '@/application/usecases/post/GetPostByIdUsecase ';
import { GetPostByIdRequestDto } from '@/application/usecases/post/dto/GetPostByIdDto';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';

/**
 * 게시글 상세 조회 API
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ 'post-id': string }> }
) {
  try {
    // 1) URL 파라미터에서 post_id 추출
    const { 'post-id': post_id } = await params;
    // 2) 쿼리스트링에서 user_id 추출
    const user_id = req.headers.get('x-user-id') ?? '';

    // 3) DTO 생성
    const dto: GetPostByIdRequestDto = { post_id, user_id };

    // 4) Usecase 호출 (repository + dto)
    const post = await GetPostByIdUsecase(SbPostRepository, dto);

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.error('게시글 상세 조회 실패:', error);
    return NextResponse.json(
      { message: error.message ?? '게시글 조회 중 오류가 발생했습니다.' },
      { status: 404 }
    );
  }
}
