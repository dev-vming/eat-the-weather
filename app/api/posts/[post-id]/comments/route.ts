import { NextRequest, NextResponse } from 'next/server';
import { SbCommentRepository } from '@/infra/repositories/supabase/SbCommentRepository';
import { GetCommentUsecase } from '@/application/usecases/comment/GetCommentUsecase';

interface RequestParams {
  params: {
    "post-id": string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: RequestParams
) {
  try {
    const { 'post-id': post_id } = await params;
    if (!post_id) {
      return NextResponse.json({ error: 'postId가 필요합니다' }, { status: 400 });
    }

    const repository = SbCommentRepository();
    const comments = await GetCommentUsecase(repository, { post_id });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('❌ 댓글 목록 조회 실패:', error);
    return NextResponse.json({ error: '댓글 목록 조회 실패' }, { status: 500 });
  }
}
