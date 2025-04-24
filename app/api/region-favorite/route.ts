import { NextRequest, NextResponse } from 'next/server';
import { CreateRegionFavoriteUsecase } from '@/application/usecases/regionFavorite/CreateRegionFavoriteUsecase';
import { DeleteRegionFavoriteUsecase } from '@/application/usecases/regionFavorite/DeleteRegionFavoriteUsecase';
import { UpdateRegionFavoriteUsecase } from '@/application/usecases/regionFavorite/UpdateRegionFavoriteUsecase';
import { SbRegionFavoriteRepository } from '@/infra/repositories/supabase/SbRegionFavoriteRepository';

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const updatedFavorites = await CreateRegionFavoriteUsecase(
      SbRegionFavoriteRepository(),
      data
    );
    return NextResponse.json(updatedFavorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const dto = await req.json();

  try {
    const updatedFavorites = await DeleteRegionFavoriteUsecase(
      SbRegionFavoriteRepository(),
      dto
    );
    return NextResponse.json(updatedFavorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, regions } = body;

    if (!user_id || !Array.isArray(regions)) {
      return NextResponse.json({ error: 'user_id와 regions 배열이 필요합니다.' }, { status: 400 });
    }

    const updatedFavorites = await UpdateRegionFavoriteUsecase(
      SbRegionFavoriteRepository(),
      user_id,
      regions
    );

    return NextResponse.json(updatedFavorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


