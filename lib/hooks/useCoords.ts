// hooks/useCoords.ts
import { useQuery } from '@tanstack/react-query';
import { SbRegionRepository } from '@/infra/repositories/supabase/SbRegionRepository';

export const useCoordsByRegionName = (name: string) => {
  return useQuery({
    queryKey: ['coords', name],
    queryFn: async () => {
      const repo = SbRegionRepository();
      const data = await repo.getCoordsByName(name);
      if (!data) throw new Error('지역 정보 조회 실패');
      return data;
    },
    enabled: !! name,
  });
};
