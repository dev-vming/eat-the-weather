import { NextRequest, NextResponse } from 'next/server';
import { GetPostByIdUsecase } from '@/application/usecases/post/GetPostByIdUsecase ';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';

/**
 * 게시글 상세 조회 API
 * @param req - Next.js API 요청
 * @param context - URL 파라미터에서 post_id 추출
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ 'post-id': string }> } // params는 Promise로 감싸져 있음
) {
  try {
    const { 'post-id': post_id } = await params;

    const post = await GetPostByIdUsecase(SbPostRepository, post_id);

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.error('게시글 상세 조회 실패:', error);
    return NextResponse.json(
      { message: error.message ?? '게시글 조회 중 오류가 발생했습니다.' },
      { status: 404 }
    );
  }
}
