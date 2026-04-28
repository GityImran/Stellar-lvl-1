"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Pay" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 rounded-2xl border-2 border-blue-200 bg-white p-1 shadow-[0_10px_0_rgba(37,99,235,0.12)]">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "focus-ring rounded-xl px-3 py-2 text-sm font-semibold transition",
              active
                ? "bg-blue-600 text-white shadow-[0_6px_0_rgba(30,64,175,0.30)]"
                : "text-slate-900 hover:bg-blue-50"
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

