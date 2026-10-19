import type { Metadata } from "next";
import { NukeToday } from "@/components/nuke-today/nuke-today";

export const metadata: Metadata = {
  title: "Kashgar | Nuke Today",
  description: "Plan today's office tickets and skill-building tasks, reflect, and track your progress.",
};

export default function NukeTodayPage() {
  return <NukeToday />;
}