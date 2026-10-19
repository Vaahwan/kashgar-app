"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/form-field";

const initialBullets = [
  { id: 1, text: "Accumulated at-least 10-12 lakh in net-wealth by 2027" },
  { id: 2, text: "Doing job as “software developer”" },
  { id: 3, text: "The package of my job is 12-13 lakh" },
  { id: 4, text: "Looks very fit & handsome young man" },
];

export function Vision() {
  const [bullets, setBullets] = useState(initialBullets);
  const [draft, setDraft] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(5);
  const inputRef = useRef<HTMLInputElement>(null);

  function addBullet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setBullets([...bullets, { id: nextId.current++, text }]);
    setDraft("");
    setAnnouncement("Vision point added.");
    inputRef.current?.focus();
  }

  return (
    <Card as="section" className="flex w-full max-w-[820px] scroll-mt-[150px] flex-col gap-2 px-5 py-6 min-[641px]:scroll-mt-[100px] min-[641px]:px-8 min-[641px]:py-7" id="vision" aria-labelledby="vision-heading">
      <h2 className="mb-3 font-[family-name:var(--font-bricolage)] text-[22px] leading-[1.3] font-bold" id="vision-heading">Medium Term Vision</h2>
      <ul className="m-0 list-none p-0">
        {bullets.map((bullet) => (
          <li className="flex items-center gap-2.5 border-t border-(--line) py-1.5 text-[15px] leading-normal min-[641px]:gap-3.5 min-[641px]:text-base" key={bullet.id}>
            <span className="size-[7px] shrink-0 rounded-full bg-(--accent)" aria-hidden="true" />
            <span className="min-w-0 flex-1 wrap-anywhere">{bullet.text}</span>
            <button className="min-h-11 min-w-11 cursor-pointer rounded-lg border-0 bg-transparent text-xl text-(--muted) hover:bg-(--sub) hover:text-(--text)" type="button" aria-label={`Remove vision point: ${bullet.text}`} onClick={() => { setBullets(bullets.filter((item) => item.id !== bullet.id)); setAnnouncement("Vision point removed."); inputRef.current?.focus(); }}>×</button>
          </li>
        ))}
      </ul>
      {!bullets.length && <p className="text-(--muted)">What do you want your future to look like? Add your first vision point.</p>}
      <form className="mt-2 flex gap-2.5" onSubmit={addBullet}>
        <label className="sr-only" htmlFor="new-vision-point">New bullet point</label>
        <Input ref={inputRef} className="min-w-0 flex-1" id="new-vision-point" type="text" placeholder="Add a bullet point..." value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={300} />
        <Button variant="primary" type="submit" disabled={!draft.trim()}>Add</Button>
      </form>
      <p className="sr-only" role="status">{announcement}</p>
    </Card>
  );
}