import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LinkItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-4 px-2 text-sm hover:bg-gray-50"
    >
      <span>{label}</span>
      <ChevronRight size={16} className="text-gray-400" />
    </Link>
  );
}