"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("glass rounded-2xl", className)}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("p-5 sm:p-6", className)}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("px-5 pb-5 sm:px-6 sm:pb-6", className)}
    />
  );
}

