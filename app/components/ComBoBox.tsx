'use client';

import { useFavoriteRegion } from '@/lib/hooks/useFavoriteRegion';

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

// ✅ 유저 ID (임시 하드코딩 또는 로그인 연동되면 대체)
const userId = '0696ef51-33cc-471d-a95c-265d9565ee06';

export function ComboboxDemo() {
  const { selectedRegion, setSelectedRegion } = useFavoriteRegion();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [regions, setRegions] = React.useState<{
    region_id: string;
    region_name: string;
    lat: number;
    lon: number;
  }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { setSelectedWeatherRegion } = useUserStore();


  // 🔁 API 호출
  React.useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(`/api/region-favorite/${userId}`);
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


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="font-bold text-lg w-[14rem] justify-between bg-white"
        >
          {value || '지역을 선택해주세요.'}
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
                          name: raw.region_name,  // ✅ userStore에선 name으로 통일해뒀지!
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
