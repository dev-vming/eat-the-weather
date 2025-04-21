import { NextRequest, NextResponse } from 'next/server';
import { GetByUserIdRegionUsecase } from '@/application/usecases/regionFavorite/GetByUserIdRegionUsecase';
import { SbRegionFavoriteRepository } from '@/infra/repositories/supabase/SbRegionFavoriteRepository';

type Params = {
  params: {
    user_id: string;
  };
};

export async function GET(_: NextRequest, { params }: Params) {
  const user_id = decodeURIComponent(params.user_id);

  try {
    const favorites = await GetByUserIdRegionUsecase(SbRegionFavoriteRepository(), user_id);
    return NextResponse.json(favorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}