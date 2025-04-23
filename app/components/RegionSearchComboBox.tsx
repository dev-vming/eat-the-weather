'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
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
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';

interface Region {
  region_id: string;
  name: string;
  lat: number;
  lon: number;
}

interface ComboboxProps {
  value: Region | undefined;
  onChange: (region: Region) => void;
}

export function RegionSearchCombobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get('/region');
        setRegions(res.data as Region[]);
      } catch (error) {
        console.error('지역 목록을 불러오지 못했습니다.', error);
      }
    };
    fetchRegions();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between text-md"
        >
          {value?.name || '지역을 선택해주세요.'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="지역명 입력..." />
          <CommandList>
            <CommandEmpty>해당 지역을 찾을 수 없습니다.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  key={region.region_id}
                  value={region.name}
                  onSelect={(currentValue: string) => {
                    const selected = regions.find(r => r.name === currentValue);
                    if (selected) {
                      onChange(selected);
                    }
                    setOpen(false);
                  }}
                >
                  {region.name}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value?.region_id === region.region_id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}