import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useFavoriteRegion } from '@/store/useFavoriteRegion';
import geoFindMe from '@/utils/geo';
import { Region } from '@/domain/entities/Region';

export const useAutoLocation = () => {

    const { selectedRegion, setSelectedRegion } = useFavoriteRegion();
    const { selectedWeatherRegion, setSelectedWeatherRegion } = useUserStore(); // ✅ 날씨 API용
    const [regions, setRegions] = useState<Region[]>([]); // 지역 목록

    const user_id = useUserStore((state) => state.user.user_id);

    useEffect(() => {
        if (!user_id || user_id.trim() === '') return;

        // 즐겨찾기 목록 미리 받아오기
        const fetchFavorites = async () => {
            try {
                const res = await fetch(`/api/region-favorite/${user_id}`);
                if (!res.ok) {
                    console.warn("🚫 지역 즐겨찾기 fetch 실패");
                    return;
                }
                const data = await res.json();
                setRegions(data);
            } catch (err) {
                console.error("🧨 fetch 실패:", err);
            }
        };

        fetchFavorites();
    }, [user_id]);
    

    useEffect(() => {
        // 이미 설정되어 있으면 아무것도 안 함
        if (selectedWeatherRegion) return;

        geoFindMe()
            .then(async ({ latitude, longitude }) => {

                const res = await fetch('/api/region', {
                    method: 'POST',
                    body: JSON.stringify({ latitude, longitude }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) return;
                const regionName = await res.json();

                // 🎯 즐겨찾기 안에서 이 이름이 있는지 먼저 찾아보기!
                const matchedRegion = regions.find(r => r.name === regionName);

                if (matchedRegion) {
                    // 🎯 매칭되면 그 region 그대로 사용
                    setSelectedWeatherRegion({
                        region_id: matchedRegion.region_id,
                        name: matchedRegion.name,
                        lat: matchedRegion.lat,
                        lon: matchedRegion.lon,
                    });
                } else {


                    // res에서 받아온 이름으로 다시 상세 정보 요청
                    const res2 = await fetch(`/api/region/${encodeURIComponent(regionName)}`);
                    const region = await res2.json();

                    const resolvedRegionName = typeof regionName === 'string' ? regionName : region.region_name;

                    setSelectedWeatherRegion({
                        region_id: region.region_id || 'auto-id',
                        name: resolvedRegionName,
                        lat: region.lat,
                        lon: region.lon,
                    });
                }

                setSelectedRegion({
                    region_id: 'current-location',
                    region_name: '현재 위치',
                    lat: latitude,
                    lon: longitude,
                });


            },
                (err) => {
                    console.warn("⛔ 위치 권한 거부됨", err);

                    // 👉 기본값으로 서울 중구 설정
                    setSelectedWeatherRegion({
                        region_id: 'b32f5114-e015-4ac5-afba-0375f6e2c5c5',
                        name: '서울특별시 중구',
                        lat: 37.5638077703601,
                        lon: 126.997555182293,
                    });
                }
            );
    }, [selectedWeatherRegion, setSelectedWeatherRegion]);
};
