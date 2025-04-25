import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  const handleMoveBack = () => {
    router.back();
  }

  return (
    <ChevronLeft
      className="w-5 h-5 cursor-pointer"
      onClick={handleMoveBack}
    />
  )
}