"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "@/components/layout/layout-provider";

const menu = ["Home", "Nuke Today", "Weekly", "History", "New Me", "Dump Box", "Instruction", "Attack Mode", "Problem Solving", "When You Fall Off"];
const areas = ["Milestones", "Finance", "Man of Gold", "Fitness", "Achievements", "Newsletter"];
const navigationItemClasses = "mb-0.5 block w-full rounded-lg border-0 px-3 py-2.5 text-left text-sm leading-5";
const routes: Record<string, string> = { Home: "/", "Nuke Today": "/nuke-today" };

export function Sidebar() {
  const { menuOpen, closeMenu } = useLayout();
  const pathname = usePathname();

  return (
    <aside
      id="dashboard-sidebar"
      className={`fixed top-(--header-height) bottom-0 left-0 z-9 max-h-[calc(100dvh-var(--header-height))] w-[272px] flex-col gap-7 overflow-y-auto border-r border-(--line) bg-(--surface) px-4 py-6 shadow-[12px_0_30px_#0003] min-[901px]:sticky min-[901px]:bottom-auto min-[901px]:z-auto min-[901px]:flex min-[901px]:w-auto min-[901px]:self-start min-[901px]:border-0 min-[901px]:bg-transparent min-[901px]:px-0 min-[901px]:py-7 min-[901px]:shadow-none ${menuOpen ? "flex" : "hidden"}`}
    >
      {[{ label: "Menu", items: menu }, { label: "Areas", items: areas }, { label: "Database", items: ["Database"] }].map((group) => (
        <nav key={group.label} aria-label={group.label}>
          <h2 className="px-3 pb-2 text-[11px] font-bold tracking-[.14em] text-(--muted) uppercase">{group.label}</h2>
          {group.items.map((item) => routes[item] ? (
            <Link
              className={`${navigationItemClasses} ${pathname === routes[item] ? "bg-(--soft) font-bold text-(--accent-text)" : "bg-transparent font-medium text-(--text-secondary) hover:bg-(--sub) hover:text-(--text)"}`}
              key={item}
              href={routes[item]}
              aria-current={pathname === routes[item] ? "page" : undefined}
              onClick={closeMenu}
            >{item}</Link>
          ) : (
            <button className={`${navigationItemClasses} cursor-not-allowed bg-transparent font-medium text-(--text-secondary) hover:bg-(--sub) hover:text-(--text)`} type="button" key={item} aria-disabled="true" title={`${item} — coming soon`}>{item}</button>
          ))}
        </nav>
      ))}
    </aside>
  );
}