import { RegionFavoriteRepogitory } from '@/domain/repositories/RegionFavoriteRepository';
import { supabase } from './Sbclient';

export const SbRegionFavoriteRepository = (): RegionFavoriteRepogitory => ({
  async create(resionFavoriteData) {
    const { data, error } = await supabase
      .from('user_region_favorite')
      .insert(resionFavoriteData)
      .select()
      .single();

    if (error || !data) throw new Error('지역 즐겨찾기 생성 실패');

    return data;
  },
  async delete(resionFavoriteDto) {
    const { data, error } = await supabase
      .from('user_region_favorite')
      .delete()
      .eq('user_id', resionFavoriteDto.user_id)
      .eq('region_id', resionFavoriteDto.region_id)
      .select()
      .single();

    if (error || !data) throw new Error('지역 즐겨찾기 삭제 실패');

    return data;
  },
  async update(resionFavoriteData) {
    const { data, error } = await supabase
      .from('user_region_favorite')
      .update({ is_primary: resionFavoriteData.is_primary })
      .eq('user_id', resionFavoriteData.user_id)
      .eq('region_id', resionFavoriteData.region_id)
      .select()
      .single();

    if (error || !data) throw new Error('지역 즐겨찾기 수정 실패');

    return data;
  },
  async getByUserId(user_id: string) {
    const { data, error } = await supabase
      .from('user_favorite_regions_view')
      .select('*')
      .eq('user_id', user_id)
      .order('is_primary', { ascending: false }) 
      .order('region_name', { ascending: true }); 
  
    if (error) throw new Error('유저 아이디로 지역 즐겨찾기 검색 실패');
    return data ?? [];
  }
});
