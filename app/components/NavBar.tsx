"use client";

import { Home, Cloud, LayoutList, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: <Home size={20} />, label: "홈" },
  { href: "/weather", icon: <Cloud size={20} />, label: "날씨" },
  { href: "/posts", icon: <LayoutList size={20} />, label: "게시판" },
  { href: "/auth/login", icon: <User size={20} />, label: "로그인" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.06)] z-50 flex justify-around py-2 h-14 pb-[env(safe-area-inset-bottom)]">

      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex flex-col items-center text-sm ${pathname === tab.href ? "text-black font-semibold" : "text-gray-400"}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
};