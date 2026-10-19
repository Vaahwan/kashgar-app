import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "figure" | "details";
  surface?: "default" | "soft";
};

export function Card({ as: Element = "div", surface = "default", className = "", ...props }: CardProps) {
  return (
    <Element
      className={`rounded-2xl border shadow-(--shadow) ${surface === "soft" ? "border-transparent bg-(--soft)" : "border-(--line) bg-(--surface)"} ${className}`}
      {...props}
    />
  );
}