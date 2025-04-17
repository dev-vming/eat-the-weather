'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const tags = ["# 옷차림", "# 날씨"];

export default function TagFilter() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          onClick={() => toggleTag(tag)}
          variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
          className="cursor-pointer select-none w-20 "
        >
          {tag}
        </Badge>
      ))}                             
    </div>
  );
}
