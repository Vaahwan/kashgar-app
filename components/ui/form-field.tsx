import type { ComponentProps } from "react";

const fieldClasses = "block min-h-11 w-full rounded-[10px] border border-(--line) bg-(--sub) px-4 py-2.5 text-sm text-(--text) placeholder:text-(--muted) placeholder:opacity-100";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${fieldClasses} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return <textarea className={`${fieldClasses} resize-y ${className}`} {...props} />;
}