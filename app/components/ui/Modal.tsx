import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className={cn(
          "w-full max-w-md bg-white rounded-3xl border-2 border-slate-200 shadow-[0_12px_0_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className="flex items-center justify-between p-6 border-b-2 border-slate-100">
          <h2 className="text-xl font-black text-slate-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
            ✕
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
