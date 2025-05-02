'use client'
import { Badge } from '@/components/ui/badge';

export default function SensitivityBadge({
  sensitivity,
}: {
  sensitivity: number;
}) {
  return (
    <>
      {sensitivity === -1 && (
        <Badge className="w-30 bg-blue-200" variant="outline">
          🥶 추위를 많이 타요
        </Badge>
      )}
      {sensitivity === 0 && (
        <Badge className="w-20 bg-lime-200" variant="outline">
          😌 딱 좋아요
        </Badge>
      )}
      {sensitivity === 1 && (
        <Badge className="w-30 bg-orange-300" variant="outline">
          🥵 더위를 많이 타요
        </Badge>
      )}
    </>
  );
}
