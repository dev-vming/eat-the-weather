// app/api/posts/[post-id]/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SbLikeRepository } from '@/infra/repositories/supabase/SbLikeRepository';
import { AddLikeUsecase } from '@/application/usecases/like/AddLikeUsecase';
import { RemoveLikeUsecase } from '@/application/usecases/like/RemoveLikeUsecase';

interface Params {
  'post-id': string;
}

// POST /api/posts/:post-id/like
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { 'post-id': postId } = await params;
  // 클라이언트에서 { userId } 로 보냈으니, 바로 꺼냅니다.
  const { userId } = (await req.json()) as { userId?: string };

  if (!userId) {
    return NextResponse.json(
      { message: 'userId is required in request body.' },
      { status: 400 }
    );
  }

  try {
    // () 꼭 붙여서 구현체 생성
    await AddLikeUsecase(SbLikeRepository, userId, postId);
    return NextResponse.json({ message: 'Like added.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to add like.' },
      { status: 400 }
    );
  }
}

// DELETE /api/posts/:post-id/like
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { 'post-id': postId } = await params;
  // DELETE 도 body에 { userId } 담아 보내도록 통일
  const { userId } = (await req.json()) as { userId?: string };

  if (!userId) {
    return NextResponse.json(
      { message: 'userId is required in request body.' },
      { status: 400 }
    );
  }

  try {
    await RemoveLikeUsecase(SbLikeRepository, userId, postId);
    return NextResponse.json({ message: 'Like removed.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to remove like.' },
      { status: 400 }
    );
  }
}
