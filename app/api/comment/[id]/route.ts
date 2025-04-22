import { NextRequest, NextResponse } from 'next/server';
import { SbCommentRepository } from '@/infra/repositories/supabase/SbCommentRepository';
import { DeleteCommentUsecase } from '@/application/usecases/comment/DeleteCommentUsecase';
import { GetCommentUsecase } from '@/application/usecases/comment/GetCommentUsecase';

interface RequestParams {
  params: {
    id: string;
  };
}

export async function DELETE(
  req: NextRequest,
  { params }: RequestParams
) {
  try {
    const { id } = await params;
    const repository = SbCommentRepository();
    
    if (!id) {
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }
    const success = await DeleteCommentUsecase(repository, id);


    if (!success) {
      return NextResponse.json({ error: "Comment not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: RequestParams
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'postId가 필요합니다' }, { status: 400 });
    }

    const repository = SbCommentRepository();

    const comments = await GetCommentUsecase(repository, { post_id: id });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('❌ 댓글 목록 조회 실패:', error);
    return NextResponse.json({ error: '댓글 목록 조회 실패' }, { status: 500 });
  }
}

