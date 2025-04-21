import { NextRequest, NextResponse } from 'next/server';
import { SbCommentRepository } from '@/infra/repositories/supabase/SbCommentRepository';
import { CreateCommentUsecase } from '@/application/usecases/comment/CreateCommentUsecase';
import { CreateCommentDto } from '@/application/usecases/comment/dto/CreateCommentDto';

// POST 요청 핸들러: 댓글 생성
export async function POST(req: NextRequest) {
  try {
    // 클라이언트로부터 전달받은 JSON 요청 바디를 CreateCommentDto 타입으로 파싱
    const body: CreateCommentDto = await req.json();

    // 유효성 검사: post_id, user_id, content 중 하나라도 없으면 400 에러 반환
    if (!body.post_id || !body.user_id || !body.content) {
      return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    // Supabase 기반의 CommentRepository 인스턴스 생성
    const repository = SbCommentRepository();

    // 댓글 생성 Usecase 실행 (비즈니스 로직 처리)
    const result = await CreateCommentUsecase(repository, body);

    // 성공적으로 생성된 댓글 데이터를 201 Created 상태로 응답
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // 서버 측 오류 발생 시 콘솔에 에러 로그 출력
    console.error('❌ 댓글 생성 중 오류:', error);

    // 클라이언트에 500 Internal Server Error 응답
    return NextResponse.json(
      { message: '댓글 생성 중 오류 발생', error },
      { status: 500 }
    );
  }
}
