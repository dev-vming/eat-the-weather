
import { NextRequest, NextResponse } from 'next/server';

import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { updateUserInfoUsecase } from '@/application/usecases/user/UpdateUserInfoUsecase';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, ...dto } = body;

    if (!user_id) {
      return NextResponse.json({ message: 'user_id는 필수입니다.' }, { status: 400 });
    }

    const updatedUser = await updateUserInfoUsecase(SbUserRepository(), user_id, dto);

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: '유저 정보 수정 중 오류 발생', error: (err as Error).message },
      { status: 500 }
    );
  }
}