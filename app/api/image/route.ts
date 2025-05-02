import { UploadImageusecase } from '@/application/usecases/image/UploadImageUsecase';
import { SbImageRepository } from './../../../infra/repositories/supabase/SbImageRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const fileName = formData.get('fileName') as string;

  if (!file || !fileName) {
    return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 });
  }

  try {
    const url = await UploadImageusecase(SbImageRepository(),{file, fileName});
    return NextResponse.json({ url }); 
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

