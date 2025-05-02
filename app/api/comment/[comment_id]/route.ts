import { NextRequest, NextResponse } from 'next/server';
import { SbCommentRepository } from '@/infra/repositories/supabase/SbCommentRepository';
import { DeleteCommentUsecase } from '@/application/usecases/comment/DeleteCommentUsecase';
import { GetCommentUsecase } from '@/application/usecases/comment/GetCommentUsecase';

interface RequestParams {
  params: {
    comment_id: string;
  };
}

export async function DELETE(
  req: NextRequest,
  { params }: RequestParams
) {
  try {
    const { comment_id } = await params;
    const repository = SbCommentRepository();

    if (!comment_id) {
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }
    const success = await DeleteCommentUsecase(repository, comment_id);


    if (!success) {
      return NextResponse.json({ error: "Comment not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}

