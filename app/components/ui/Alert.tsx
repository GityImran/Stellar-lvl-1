"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "success" | "error" | "info" | "warning";

const toneClasses: Record<Tone, string> = {
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  error: "border-red-300 bg-red-50 text-red-900",
  info: "border-blue-300 bg-blue-50 text-blue-950",
  warning: "border-amber-300 bg-amber-50 text-amber-950",
};

export function Alert({
  tone = "info",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: Tone }) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border-2 p-4 text-sm leading-relaxed shadow-[0_8px_0_rgba(37,99,235,0.12)]",
        toneClasses[tone],
        className
      )}
    />
  );
}

