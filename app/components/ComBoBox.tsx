'use client';

import { useFavoriteRegion } from '@/store/useFavoriteRegion';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { useUserStore } from '@/store/userStore';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';



export function ComboboxDemo() {
  const user_id = useUserStore((state) => state.user.user_id);

  const { selectedRegion, setSelectedRegion } = useFavoriteRegion();
  const { setSelectedWeatherRegion, selectedWeatherRegion } = useUserStore();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(selectedWeatherRegion?.name ?? '');
  const [regions, setRegions] = React.useState<{
    region_id: string;
    region_name: string;
    lat: number;
    lon: number;
  }[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 🔁 API 호출
  React.useEffect(() => {
    const fetchRegions = async () => {
      if (!user_id) {
        console.warn('⚠️ user_id가 아직 준비되지 않았습니다.');
        return;
      }
 
      try {
        const res = await fetch(`/api/region-favorite/${user_id}`);
        const data = await res.json();
        setRegions(data);
      } catch (e) {
        console.error('즐겨찾기 지역 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);


  // ✅ 자동 위치 지역이 regions 배열에 없으면 추가
  React.useEffect(() => {
    if (
      selectedWeatherRegion &&
      selectedWeatherRegion.region_id &&
      !regions.find(r => r.region_name === selectedWeatherRegion.name)
    ) {
      setRegions(prev => [...prev, {
        region_id: selectedWeatherRegion.region_id,
        region_name: selectedWeatherRegion.name,
        lat: selectedWeatherRegion.lat,
        lon: selectedWeatherRegion.lon,
      }]);
    }
  }, [selectedWeatherRegion, regions]);



  React.useEffect(() => {
    if (selectedWeatherRegion?.name && value !== selectedWeatherRegion.name) {
      setValue(selectedWeatherRegion.name);
    }
  }, [selectedWeatherRegion?.name, value]);



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="font-bold text-lg w-[14rem] justify-between bg-white"
        >
          {value || selectedWeatherRegion?.name || '지역을 선택해주세요.'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="지역을 선택해주세요." />
          <CommandList>
            <CommandEmpty>해당 행정구역을 찾을 수 없습니다.</CommandEmpty>
            <CommandGroup>
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-400">불러오는 중...</div>
              ) : (
                regions.map((region) => (
                  <CommandItem
                    key={region.region_id}
                    value={region.region_name}
                    onSelect={(currentValue: string) => {
                      const raw = regions.find((r) => r.region_name === currentValue); // API에서는 region_name일 수 있음
                      if (raw) {
                        const selected = {
                          region_id: raw.region_id,
                          region_name: raw.region_name,
                          lat: raw.lat,
                          lon: raw.lon,
                        };

                        setSelectedRegion(selected);

                        setSelectedWeatherRegion({
                          region_id: raw.region_id,
                          name: raw.region_name,
                          lat: raw.lat,
                          lon: raw.lon,
                        });


                        setValue(selected.region_name);
                        setOpen(false);
                      }
                    }}
                  >
                    {region.region_name}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === region.region_name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
