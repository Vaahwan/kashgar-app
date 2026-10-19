"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Card } from "@/components/ui/card";

const periods = ["Daily", "Weekly", "12 Week Year"] as const;
const tracks = [
  { name: "Stability", progress: 37.5, notes: "3 notes" },
  { name: "Growth", progress: 25, notes: "2 notes" },
  { name: "Content", progress: 0, notes: "No notes" },
  { name: "Fitness", progress: 60, notes: "2 notes" },
];

export function Tracks() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("Daily");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % periods.length;
    else if (event.key === "ArrowLeft") next = (index + periods.length - 1) % periods.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = periods.length - 1;
    else return;
    event.preventDefault();
    setPeriod(periods[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="flex scroll-mt-[150px] flex-col gap-5 min-[641px]:scroll-mt-[100px]" id="tracks" aria-labelledby="tracks-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-bricolage)] text-[22px] leading-[1.3] font-bold" id="tracks-heading">Tracks</h2>
        <div className="flex w-full gap-1 rounded-xl bg-(--sub) p-1 min-[641px]:w-auto" role="tablist" aria-label="Track period">
          {periods.map((name, index) => (
            <button
              key={name}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`track-tab-${index}`}
              type="button"
              className={`min-h-11 flex-1 cursor-pointer rounded-[9px] border-0 px-2.5 text-sm min-[641px]:flex-none min-[641px]:px-5 ${period === name ? "bg-(--surface) font-bold text-(--text) shadow-(--shadow)" : "bg-transparent font-medium text-(--muted)"}`}
              role="tab"
              aria-selected={period === name}
              aria-controls="track-panel"
              tabIndex={period === name ? 0 : -1}
              onClick={() => setPeriod(name)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >{name}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-[361px]:grid-cols-2 min-[901px]:grid-cols-4" id="track-panel" role="tabpanel" aria-labelledby={`track-tab-${periods.indexOf(period)}`} tabIndex={0}>
        {tracks.map((track) => (
          <Card as="article" className="flex flex-col gap-5 px-4 py-5 hover:border-(--accent) min-[641px]:p-6 min-[901px]:max-[1151px]:px-4 min-[901px]:max-[1151px]:py-5" key={track.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-[family-name:var(--font-bricolage)] text-[19px] leading-[1.3] font-bold">{track.name}</h3>
              <span className="text-[13px] text-(--muted)">{track.notes}</span>
            </div>
            <p className="font-[family-name:var(--font-bricolage)] text-4xl leading-[1.3] font-bold">{track.progress}%</p>
            <div className="h-1.5 overflow-hidden rounded-[3px] bg-(--line)" role="progressbar" aria-label={`${track.name} ${period} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={track.progress}>
              <div className="h-full rounded-[inherit] bg-(--accent)" style={{ width: `${track.progress}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}