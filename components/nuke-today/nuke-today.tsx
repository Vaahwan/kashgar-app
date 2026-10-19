"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

type Status = "Not started" | "In progress" | "Done";
type OfficeTicket = { id: number; name: string; hours: number | ""; status: Status; done: number };
type SkillTask = { id: number; name: string; importance: number | ""; checked: boolean };

const initialOffice: OfficeTicket[] = [
  { id: 1, name: "first session", hours: 3, status: "Done", done: 37.5 },
  { id: 2, name: "second session", hours: "", status: "Not started", done: 0 },
];
const initialSkills: SkillTask[] = [
  { id: 1, name: "one hour of skillup", importance: 75, checked: false },
];
const statuses: Status[] = ["Not started", "In progress", "Done"];
const statusClasses: Record<Status, string> = {
  "Not started": "bg-(--sub) text-(--muted)",
  "In progress": "bg-(--soft) text-(--accent-text)",
  Done: "bg-(--success-bg) text-(--success-text)",
};
const cellClasses = "h-[52px] border-t border-(--line) py-2 pr-3 first:pl-6 last:pr-6";
const headingClasses = "h-[52px] pr-3 text-left text-xs font-bold tracking-[.08em] text-(--muted) first:pl-6 last:pr-6";

function getTodayLabel() {
  return `TODAY · ${new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).toUpperCase()}`;
}

function subscribeToDate(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

function getServerTodayLabel() {
  return "TODAY";
}

export function NukeToday() {
  const today = useSyncExternalStore(subscribeToDate, getTodayLabel, getServerTodayLabel);
  const [office, setOffice] = useState(initialOffice);
  const [skills, setSkills] = useState(initialSkills);
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(3);
  const sumHours = office.reduce((sum, ticket) => sum + Number(ticket.hours), 0);
  const sumDone = office.reduce((sum, ticket) => sum + ticket.done, 0);

  function cycleStatus(id: number) {
    setOffice((tickets) => tickets.map((ticket) => ticket.id === id
      ? { ...ticket, status: statuses[(statuses.indexOf(ticket.status) + 1) % statuses.length] }
      : ticket));
  }

  function addOfficeTicket() {
    const ticket: OfficeTicket = { id: nextId.current++, name: "Untitled", hours: "", status: "Not started", done: 0 };
    setOffice((tickets) => [...tickets, ticket]);
    setAnnouncement("New office ticket added.");
  }

  function addSkillTask() {
    const task: SkillTask = { id: nextId.current++, name: "Untitled", importance: "", checked: false };
    setSkills((tasks) => [...tasks, task]);
    setAnnouncement("New skill task added.");
  }

  return (
    <main className="flex min-w-0 max-w-[1100px] scroll-mt-[150px] flex-col gap-8 pt-8 min-[641px]:scroll-mt-[100px]" id="main-content">
      <header className="flex flex-col gap-2.5">
        <p className="text-[11px] font-bold tracking-[.14em] text-(--accent-text)" suppressHydrationWarning>{today}</p>
        <h1 className="font-[family-name:var(--font-bricolage)] text-[34px] leading-[1.1] font-bold min-[901px]:text-[44px]">Nuke Today</h1>
      </header>

      <section className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-2" aria-label="Daily reflection">
        <Card as="details" className="px-6">
          <summary className="flex min-h-14 cursor-pointer items-center py-3 text-[15px] font-bold">What Works (Do More)</summary>
          <p className="mb-5 text-[15px] text-(--muted)">[Add what works]</p>
        </Card>
        <Card as="details" className="px-6">
          <summary className="flex min-h-14 cursor-pointer items-center py-3 text-[15px] font-bold">What Doesn’t Work (Needs to change)</summary>
          <p className="mb-5 text-[15px] text-(--muted)">[Add what needs to change]</p>
        </Card>
      </section>

      <Card as="section" className="min-w-0 overflow-hidden" aria-labelledby="stability-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <h2 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold" id="stability-heading">Stability</h2>
            <p className="mt-1 text-[13px] text-(--muted)">Office</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => {
              setOffice((tickets) => tickets.map((ticket) => ({ ...ticket, status: "Not started", done: 0 })));
              setAnnouncement("Office ticket statuses and progress reset.");
            }}>Reset Office</Button>
            <Button variant="primary" aria-label="Add office ticket" onClick={addOfficeTicket}>+ New</Button>
          </div>
        </div>
        <div className="overflow-x-auto" role="region" aria-label="Office tickets" tabIndex={0}>
          <table className="w-full min-w-[560px] table-fixed border-collapse text-[15px]" aria-label="Office tickets">
            <colgroup><col className="w-[35.714%]" /><col className="w-[17.857%]" /><col className="w-[21.429%]" /><col className="w-1/4" /></colgroup>
            <thead><tr>{["TICKET", "EST. HOURS", "STATUS", "DONE"].map((label) => <th className={headingClasses} scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>
              {office.map((ticket) => (
                <tr key={ticket.id}>
                  <td className={cellClasses}>{ticket.name}</td>
                  <td className={cellClasses}>{ticket.hours}</td>
                  <td className={cellClasses}>
                    <button
                      type="button"
                      className={`inline-flex min-h-8 cursor-pointer items-center rounded-2xl border-0 px-3 text-xs font-bold ${statusClasses[ticket.status]}`}
                      aria-label={`${ticket.name} status: ${ticket.status}. Change status`}
                      onClick={() => cycleStatus(ticket.id)}
                    >{ticket.status}</button>
                  </td>
                  <td className={cellClasses}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 shrink-0">{ticket.done}</span>
                      <ProgressBar className="flex-1" value={ticket.done} label={`${ticket.name} completion`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-(--sub) text-[13px] font-bold text-(--muted)">
              <tr><th className={`${cellClasses} text-left`} scope="row">SUM</th><td className={cellClasses}>{sumHours}</td><td className={cellClasses} /><td className={cellClasses}>{sumDone}</td></tr>
            </tfoot>
          </table>
        </div>
      </Card>

      <Card as="section" className="min-w-0 overflow-hidden" aria-labelledby="growth-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <h2 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold" id="growth-heading">Growth</h2>
            <p className="mt-1 text-[13px] text-(--muted)">SkillUp</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => {
              setSkills((tasks) => tasks.map((task) => ({ ...task, checked: false })));
              setAnnouncement("SkillUp task completion reset.");
            }}>Reset Skillup</Button>
            <Button variant="primary" aria-label="Add skill task" onClick={addSkillTask}>+ New</Button>
          </div>
        </div>
        <div className="overflow-x-auto" role="region" aria-label="SkillUp tasks" tabIndex={0}>
          <table className="w-full min-w-[560px] table-fixed border-collapse text-[15px]" aria-label="SkillUp tasks">
            <colgroup><col className="w-[37.037%]" /><col className="w-[18.519%]" /><col className="w-[18.519%]" /><col className="w-[25.925%]" /></colgroup>
            <thead><tr>{["TASK", "IMPORTANCE", "DONE?", "PROGRESS"].map((label) => <th className={headingClasses} scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>
              {skills.map((task) => (
                <tr key={task.id}>
                  <td className={cellClasses}>{task.name}</td>
                  <td className={cellClasses}>{task.importance}</td>
                  <td className={cellClasses}>
                    <input
                      className="size-[22px] cursor-pointer accent-(--accent)"
                      type="checkbox"
                      aria-label={`Mark ${task.name} done`}
                      checked={task.checked}
                      onChange={(event) => setSkills((tasks) => tasks.map((item) => item.id === task.id ? { ...item, checked: event.target.checked } : item))}
                    />
                  </td>
                  <td className={cellClasses}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 shrink-0">{task.checked ? 100 : 0}</span>
                      <ProgressBar className="flex-1" value={task.checked ? 100 : 0} label={`${task.name} progress`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="sr-only" role="status">{announcement}</p>
    </main>
  );
}