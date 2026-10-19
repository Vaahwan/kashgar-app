import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "outline" | "primary";
  size?: "default" | "navbar" | "icon";
};

const sizes = {
  default: "min-h-11 px-[18px] text-sm",
  navbar: "min-h-10 px-2 text-xs min-[641px]:min-h-11 min-[641px]:px-[18px] min-[641px]:text-sm",
  icon: "min-h-11 min-w-10 px-0 text-[19px]",
};

const variants = {
  outline: "border-(--line) bg-transparent font-medium text-(--text) hover:border-(--accent)",
  primary: "border-(--accent) bg-(--accent) font-bold text-(--on-accent) enabled:hover:bg-[#ffb83e] disabled:opacity-65",
};

export function Button({ variant = "outline", size = "default", type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-[10px] border whitespace-nowrap disabled:cursor-default ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}