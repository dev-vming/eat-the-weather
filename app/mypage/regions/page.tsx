'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Plus, Star, X } from 'lucide-react';
import { RegionSearchCombobox } from '@/app/components/RegionSearchComboBox';
import { UserRegionFavoriteViewDto } from '@/application/usecases/regionFavorite/dto/RegionFavoriteDto';
import { Region } from '@/domain/entities/Region';
import { useUserStore } from '@/store/userStore';

export default function MemberRegionsPage() {
  const [regions, setRegions] = useState<UserRegionFavoriteViewDto[]>([]);
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegion, setNewRegion] = useState<Region | undefined>(undefined);
  const uuid = useUserStore.getState().user.user_id;

  useEffect(() => {
    const fetchRegions = async () => {
      const response: UserRegionFavoriteViewDto[] = [
        {
          user_id: 'user123',
          region_id: '001',
          region_name: '경기도 시흥시',
          is_primary: true,
          lat: 0,
          lon: 0,
        },
        {
          user_id: 'user123',
          region_id: '002',
          region_name: '서울특별시 강남구',
          is_primary: false,
          lat: 0,
          lon: 0,
        },
      ];
      setRegions(response);
    };
    fetchRegions();
  }, []);

  const handleDelete = (region_id: string) => {
    setRegions((prev) => prev.filter((r) => r.region_id !== region_id));
  };

  const handleTogglePrimary = (region_id: string) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.region_id === region_id
          ? { ...r, is_primary: !r.is_primary }
          : { ...r, is_primary: false }
      )
    );
  };

  const handleSave = async () => {
    console.log('저장할 지역:', regions);
  };

  const handleAddClick = () => {
    setIsAddingRegion(true);
    setNewRegion(undefined);
  };

  const handleConfirmAdd = () => {
    if (
      newRegion &&
      !regions.find((r) => r.region_id === newRegion.region_id)
    ) {
      setRegions((prev) => [
        ...prev,
        {
          user_id: uuid,
          region_id: newRegion.region_id,
          region_name: newRegion.name,
          lat: newRegion.lat,
          lon: newRegion.lon,
          is_primary: false,
        },
      ]);
    }
    setIsAddingRegion(false);
    setNewRegion(undefined);
  };

  const handleCancelAdd = () => {
    setIsAddingRegion(false);
    setNewRegion(undefined);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white flex flex-col relative">
      <h1 className="text-lg font-bold mb-6">지역 즐겨찾기</h1>
      <div className="mt-40">
        <p className="font-semibold text-gray-700 py-4 px-2 border-b">지역명</p>
        <div className="w-full flex flex-col justify-around mt-4 gap-2">
          {regions.map((region) => (
            <div
              key={region.region_id}
              className="flex justify-between items-center py-4 px-4 w-full border rounded-md"
            >
              <div className="font-medium">{region.region_name}</div>
              <div className="flex flex-row gap-4">
                <Star
                  className={`w-4 h-4 cursor-pointer ${
                    region.is_primary
                      ? 'fill-amber-300 text-amber-300'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleTogglePrimary(region.region_id)}
                />
                <button
                  onClick={() => handleDelete(region.region_id)}
                  className="text-gray-600 cursor-pointer hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {isAddingRegion ? (
            <div className="border rounded-md flex items-center py-2.5 px-4 justify-between">
              <RegionSearchCombobox
                value={newRegion}
                onChange={(region) => {
                  const isDuplicate = regions.some(
                    (r) => r.region_id === region.region_id
                  );
                  if (isDuplicate) {
                    alert('이미 추가된 지역입니다.');
                  } else {
                    setNewRegion(region);
                  }
                }}
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={handleConfirmAdd}
                  disabled={
                    !newRegion ||
                    regions.some((r) => r.region_id === newRegion.region_id)
                  }
                  className=" text-gray-600 cursor-pointer hover:text-green-500 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelAdd}
                  className=" text-gray-600 cursor-pointer hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            regions.length < 3 && (
              <div
                className="rounded-md border border-dashed flex gap-3 justify-center items-center py-4 cursor-pointer"
                onClick={handleAddClick}
              >
                <Plus className="w-4 h-4 text-gray-500" />
                <p className="font-semibold text-gray-500">지역 추가하기</p>
              </div>
            )
          )}
        </div>
      </div>

      <Button className="w-full mt-4" onClick={handleSave}>
        저장하기
      </Button>
    </div>
  );
}
