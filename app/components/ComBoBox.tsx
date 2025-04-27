'use client';

import { UserRegionFavoriteViewDto } from '@/application/usecases/regionFavorite/dto/RegionFavoriteDto';
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
  const initialRegion = useUserStore((state) => state.initialRegion);

  const { setSelectedRegion } = useFavoriteRegion();
  const { setSelectedWeatherRegion, selectedWeatherRegion } = useUserStore();
  const [open, setOpen] = React.useState(false);
  const [regions, setRegions] = React.useState<{
    region_id: string;
    region_name: string;
    is_primary: boolean;
    lat: number;
    lon: number;
  }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(`/api/region-favorite/${user_id}`);
        const data: UserRegionFavoriteViewDto[] = await res.json();

        if (data.length > 0) {
          setRegions(data.map(r => ({
            region_id: r.region_id,
            region_name: r.region_name,
            is_primary: r.is_primary,
            lat: r.lat,
            lon: r.lon,
          })));

          const primary = data.find((r) => r.is_primary);
          if (primary) {
            setSelectedWeatherRegion({
              region_id: primary.region_id,
              name: primary.region_name,
              is_primary: primary.is_primary,
              lat: primary.lat,
              lon: primary.lon,
            });
            setSelectedRegion({
              region_id: primary.region_id,
              region_name: primary.region_name,
              lat: primary.lat,
              lon: primary.lon,
            });
          }
        } else if (initialRegion) {
          setSelectedWeatherRegion(initialRegion);
          setSelectedRegion({
            region_id: initialRegion.region_id,
            region_name: initialRegion.name,
            lat: initialRegion.lat,
            lon: initialRegion.lon,
          });
        }
      } catch (e) {
        console.error('즐겨찾기 지역 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchRegions();
    }
  }, [user_id, initialRegion]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="font-bold text-lg w-[14rem] justify-between bg-white"
        >
          {selectedWeatherRegion?.name || initialRegion?.name || '지역을 선택해주세요.'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="지역을 선택해주세요." />
          <CommandList>
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-400">불러오는 중...</div>
            ) : regions.length === 0 ? (
              initialRegion ? (
                <CommandGroup>
                  <CommandItem
                    value={initialRegion.name}
                    onSelect={() => {
                      if (initialRegion) {
                        setSelectedWeatherRegion(initialRegion);
                        setSelectedRegion({
                          region_id: initialRegion.region_id,
                          region_name: initialRegion.name,
                          lat: initialRegion.lat,
                          lon: initialRegion.lon,
                        });
                        setOpen(false);
                      }
                    }}
                  >
                    {initialRegion.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        selectedWeatherRegion?.name === initialRegion.name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              ) : (
                <CommandEmpty>해당 행정구역을 찾을 수 없습니다.</CommandEmpty>
              )
            ) : (
              <CommandGroup>
                {regions.map((region) => (
                  <CommandItem
                    key={region.region_id}
                    value={region.region_name}
                    onSelect={(currentValue: string) => {
                      const raw = regions.find((r) => r.region_name === currentValue);
                      if (raw) {
                        setSelectedRegion({
                          region_id: raw.region_id,
                          region_name: raw.region_name,
                          lat: raw.lat,
                          lon: raw.lon,
                        });
                        setSelectedWeatherRegion({
                          region_id: raw.region_id,
                          name: raw.region_name,
                          is_primary: raw.is_primary,
                          lat: raw.lat,
                          lon: raw.lon,
                        });
                        setOpen(false);
                      }
                    }}
                  >
                    {region.region_name}
                    <Check
                      className={cn(
                        'ml-auto',
                        selectedWeatherRegion?.name === region.region_name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

        </Command>
      </PopoverContent>
    </Popover>
  );
}
