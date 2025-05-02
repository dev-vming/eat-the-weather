'use client';

import { MapPin } from 'lucide-react';
import { ComboboxDemo } from '../components/ComBoBox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { BackButton } from './BackButton';

export default function PostHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasOutfitTag, setHasOutfitTag] = useState(false);
  const [hasWeatherTag, setHasWeatherTag] = useState(false);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order_by', value === '최신순' ? 'created_at' : 'like_count');
    router.push(`/posts?${params.toString()}`);
  };

  const handleSensitiveToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('only_sensitive_match', 'true');
    } else {
      params.delete('only_sensitive_match');
    }
    router.push(`/posts?${params.toString()}`);
  };

  const handleTagToggle = (tag: 'has_outfit_tag' | 'has_weather_tag') => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag === 'has_outfit_tag') {
      const next = !hasOutfitTag;
      setHasOutfitTag(next);
      if (next) params.set('has_outfit_tag', 'true');
      else params.delete('has_outfit_tag');
    }

    if (tag === 'has_weather_tag') {
      const next = !hasWeatherTag;
      setHasWeatherTag(next);
      if (next) params.set('has_weather_tag', 'true');
      else params.delete('has_weather_tag');
    }

    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-10 bg-white px-4 pt-6">
      <div className='flex items-center gap-4 mb-6'>
        <BackButton />
        <h1 className="text-lg font-bold">게시판</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="text-muted-foreground w-4 h-4" />
          <ComboboxDemo />
        </div>

        <Select defaultValue="최신순" onValueChange={handleSortChange}>
          <SelectTrigger className="w-[130px] cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='cursor-pointer' value="최신순">최신순</SelectItem>
            <SelectItem className='cursor-pointer' value="인기순">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between pb-4">
        <div className="flex items-center justify-start gap-2">
          <Checkbox id="filter" className='cursor-pointer' onCheckedChange={handleSensitiveToggle} />
          <label
            htmlFor="filter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            내 날씨 민감도만 보기
          </label>
        </div>

        {/* 태그 필터 */}
        <div className="flex gap-2">
          <button
            className={`cursor-pointer px-3 py-1 border rounded-full text-xs font-medium transition-colors ${
              hasOutfitTag
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
            onClick={() => handleTagToggle('has_outfit_tag')}
          >
            #옷차림
          </button>

          <button
            className={`cursor-pointer px-3 py-1 border rounded-full text-xs font-medium transition-colors ${
              hasWeatherTag
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
            onClick={() => handleTagToggle('has_weather_tag')}
          >
            #날씨
          </button>
        </div>
      </div>

      <div className="border-b" />
    </div>
  );
}
