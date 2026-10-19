"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useLayout } from "@/components/layout/layout-provider";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form-field";

const searchSections = [
  { label: "Welcome back", href: "/#welcome", keywords: "home dashboard mantra" },
  { label: "12-Week Goal", href: "/#goals", keywords: "company switch content body fat" },
  { label: "Tracks", href: "/#tracks", keywords: "stability growth content fitness notes" },
  { label: "Medium Term Vision", href: "/#vision", keywords: "wealth software developer job" },
  { label: "Nuke Today", href: "/nuke-today", keywords: "daily office stability tickets growth skillup tasks reflection" },
];

export function Navbar() {
  const { theme, toggleTheme, menuOpen, toggleMenu } = useLayout();
  const [query, setQuery] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const [entryBody, setEntryBody] = useState("");
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const results = searchSections.filter((section) =>
    `${section.label} ${section.keywords}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entryTitle.trim()) return;
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("kashgar-entries") ?? "[]");
      const entries = Array.isArray(stored) ? stored : [];
      localStorage.setItem("kashgar-entries", JSON.stringify([
        ...entries,
        { id: crypto.randomUUID(), title: entryTitle.trim(), body: entryBody.trim() },
      ]));
      setEntryTitle("");
      setEntryBody("");
      setNotice("Entry saved on this device.");
      dialogRef.current?.close();
    } catch {
      setNotice("Could not save the entry. Check that browser storage is available.");
    }
  }

  return (
    <>
      <header data-navbar className="sticky top-0 z-10 flex min-h-[68px] flex-wrap items-center gap-x-2 gap-y-3 border-b border-(--line) bg-(--surface) px-4 py-3 min-[641px]:h-[68px] min-[641px]:flex-nowrap min-[641px]:gap-3.5 min-[641px]:px-6 min-[641px]:py-0 min-[901px]:gap-5 min-[901px]:px-8">
        <Button size="icon" className="min-[901px]:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="dashboard-sidebar" onClick={toggleMenu}>☰</Button>
        <Link className="flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-bricolage)] text-[13px] font-bold tracking-[.08em] min-[641px]:gap-2.5 min-[641px]:text-lg min-[641px]:tracking-[.12em] min-[901px]:w-52" href="/" aria-label="Kashgar home">
          <span className="grid size-7 place-items-center rounded-lg bg-(--accent) text-base tracking-normal text-(--on-accent) min-[641px]:size-8" aria-hidden="true">K</span>
          <span className="hidden min-[361px]:inline">KASHGAR</span>
        </Link>
        <div className="relative order-4 min-w-0 flex-1 basis-full min-[641px]:order-none min-[641px]:max-w-[420px] min-[641px]:basis-0">
          <label className="sr-only" htmlFor="site-search">Search dashboard sections</label>
          <Input id="site-search" type="search" placeholder="Search goals, notes, pages" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setQuery(""); }} />
          {query.trim() && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] rounded-[10px] border border-(--line) bg-(--surface) p-1.5 shadow-[0_12px_32px_#0003]" aria-label="Search results">
              {results.length ? results.map((result) => (
                <Link className="block rounded-md p-3 text-sm hover:bg-(--soft)" key={result.href} href={result.href} onClick={() => setQuery("")}>{result.label}</Link>
              )) : <p className="p-2 text-sm text-(--muted)">No matching sections.</p>}
            </div>
          )}
        </div>
        <div className="ml-auto flex shrink-0 gap-1.5 min-[641px]:gap-2.5 min-[901px]:gap-5">
          <Button size="navbar" aria-label="Switch colour mode" onClick={toggleTheme}>{theme === "dark" ? "Light mode" : "Dark mode"}</Button>
          <Button variant="primary" size="navbar" onClick={() => { setNotice(""); dialogRef.current?.showModal(); }}>+ New entry</Button>
        </div>
      </header>
      <p className="fixed right-6 bottom-6 z-20 max-w-[calc(100vw-48px)] rounded-[10px] border border-(--line) bg-(--surface) px-5 py-3.5 text-sm text-(--text) empty:hidden" role="status">{notice}</p>
      <dialog className="m-auto max-h-[calc(100dvh-48px)] w-[min(480px,calc(100vw-32px))] rounded-2xl border border-(--line) bg-(--surface) p-6 text-(--text) shadow-(--shadow) backdrop:bg-black/60" ref={dialogRef} aria-labelledby="entry-heading">
        <form onSubmit={saveEntry} className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-bricolage)] text-[22px] leading-[1.3] font-bold" id="entry-heading">New entry</h2>
            <Button onClick={() => dialogRef.current?.close()} aria-label="Close new entry">×</Button>
          </div>
          <label htmlFor="entry-title">Title</label>
          <Input id="entry-title" required maxLength={160} value={entryTitle} onChange={(event) => setEntryTitle(event.target.value)} />
          <label htmlFor="entry-body">Notes</label>
          <Textarea id="entry-body" rows={5} value={entryBody} onChange={(event) => setEntryBody(event.target.value)} />
          <p className="text-[13px] text-(--muted)">Entries are saved locally in this browser.</p>
          <Button variant="primary" type="submit" disabled={!entryTitle.trim()}>Save entry</Button>
        </form>
      </dialog>
    </>
  );
}