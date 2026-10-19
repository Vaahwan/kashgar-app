import { WelcomeBack } from "@/components/home/welcome-back";
import { TwelveWeekGoal } from "@/components/home/twelve-week-goal";
import { Tracks } from "@/components/home/tracks";
import { Vision } from "@/components/home/vision";

export default function HomePage() {
  return (
    <main className="flex min-w-0 scroll-mt-[150px] flex-col gap-6 pt-6 min-[641px]:scroll-mt-[100px] min-[641px]:gap-8 min-[641px]:pt-8" id="main-content">
      <WelcomeBack />
      <Tracks />
      <TwelveWeekGoal />
      <Vision />
    </main>
  );
}
