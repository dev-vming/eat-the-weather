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
import TagFilter from '../components/TagFilter';

export default function PostHeader() {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 pt-6">
      <h1 className="text-lg font-bold mb-6">게시판</h1>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="text-muted-foreground w-4 h-4" />
          <ComboboxDemo />
        </div>

        <Select defaultValue="최신순">
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="최신순">최신순</SelectItem>
            <SelectItem value="인기순">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between pb-4">
        <div className="flex items-center justify-start gap-2">
          <Checkbox id="filter" />
          <label
            htmlFor="filter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            내 날씨 민감도만 보기
          </label>
        </div>
        <TagFilter />
      </div>
      <div className="border-b" />
    </div>
  );
}
