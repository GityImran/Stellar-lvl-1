"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      {...props}
      className={cn(
        "focus-ring inline-flex select-none items-center justify-center gap-2 rounded-2xl font-extrabold transition active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-60",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-12 px-5 text-base",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_8px_0_rgba(30,64,175,0.35),0_24px_50px_rgba(11,27,58,0.18)]",
        variant === "secondary" &&
          "bg-white text-slate-900 hover:bg-blue-50 border border-blue-200 shadow-[0_8px_0_rgba(37,99,235,0.15)]",
        variant === "ghost" &&
          "bg-transparent text-slate-900 hover:bg-blue-100/60 border border-transparent",
        variant === "danger" &&
          "bg-red-500 text-white hover:bg-red-600 shadow-[0_8px_0_rgba(153,27,27,0.30),0_24px_50px_rgba(11,27,58,0.14)]",
        className
      )}
    />
  );
}

