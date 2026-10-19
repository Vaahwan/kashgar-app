import { Card } from "@/components/ui/card";

const goals = [
  "Settle in new company",
  "15 lakh switch",
  "Continue with content",
  "12% body fat with 58 kg lean mass",
];

export function TwelveWeekGoal() {
  return (
    <Card as="section" className="scroll-mt-[150px] min-[641px]:scroll-mt-[100px]" id="goals" aria-labelledby="goals-heading">
      <div className="flex items-center justify-between gap-3 px-4 py-5 min-[641px]:p-6">
        <h2 className="font-[family-name:var(--font-bricolage)] text-[22px] leading-[1.3] font-bold" id="goals-heading">12-Week Goal</h2>
        <span className="text-[13px] text-(--muted)">{goals.length} goals</span>
      </div>
      <ol className="m-0 list-none p-0">
        {goals.map((goal, index) => (
          <li className="flex items-center gap-3 border-t border-(--line) p-4 text-[15px] leading-normal min-[641px]:gap-4 min-[641px]:px-6 min-[641px]:text-base" key={goal}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--soft) text-[13px] font-bold text-(--accent-text)" aria-hidden="true">{index + 1}</span>
            <span>{goal}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}