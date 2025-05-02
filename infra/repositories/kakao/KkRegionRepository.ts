import { CurrRegionRepository } from '@/domain/repositories/RegionRepository';

export const KkRegionRepository = (apiKey: string): CurrRegionRepository => ({
  async getRegionFromCoords(coords) {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coords.longitude}&y=${coords.latitude}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const doc = data.documents?.[0];
    if (!doc) return null;

    return {
      region_1depth_name: doc.region_1depth_name,
      region_2depth_name: doc.region_2depth_name,
    };
  },
});
