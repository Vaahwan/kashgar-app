import { Card } from "@/components/ui/card";

export function WelcomeBack() {
  return (
    <section className="grid scroll-mt-[150px] grid-cols-1 gap-6 min-[641px]:scroll-mt-[100px] min-[901px]:grid-cols-2" id="welcome" aria-labelledby="welcome-heading">
      <div className="flex flex-col justify-center gap-3 py-2">
        <p className="text-[11px] font-bold tracking-[.14em] text-(--accent-text) uppercase">WEEK 04 OF 12 · MON 19 OCT</p>
        <h1 className="font-[family-name:var(--font-bricolage)] text-4xl leading-[1.1] font-bold min-[641px]:text-[44px]" id="welcome-heading">Welcome back, Kashgar.</h1>
        <p className="max-w-[480px] text-[17px] leading-[1.6] text-(--muted)">Here is where your 12-week plan stands today.</p>
      </div>
      <Card as="figure" surface="soft" className="flex flex-col justify-center gap-3.5 px-5 py-6 min-[641px]:px-8 min-[641px]:py-7 min-[901px]:max-[1151px]:p-6">
        <figcaption className="text-[11px] font-bold tracking-[.14em] text-(--accent-text) uppercase">Daily mantra</figcaption>
        <blockquote className="font-[family-name:var(--font-sanskrit)] text-xl leading-[1.8] font-normal min-[641px]:text-[22px] min-[901px]:max-[1151px]:text-[19px]" lang="sa">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥</blockquote>
      </Card>
    </section>
  );
}