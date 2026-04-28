"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "focus-ring h-11 w-full rounded-2xl border-2 border-blue-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400",
        "hover:border-blue-300 focus-visible:border-blue-400",
        className
      )}
    />
  );
}

