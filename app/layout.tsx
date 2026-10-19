import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Tiro_Devanagari_Sanskrit } from "next/font/google";
import { LayoutProvider } from "@/components/layout/layout-provider";
import { Navbar } from "@/components/common/navbar";
import { Sidebar } from "@/components/common/sidebar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const sanskrit = Tiro_Devanagari_Sanskrit({
  variable: "--font-sanskrit",
  subsets: ["devanagari"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kashgar | Home",
  description: "Your 12-week goals, daily tracks, and medium-term vision in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bricolage.variable} ${sanskrit.variable} scroll-smooth bg-[#0e0f12] motion-reduce:scroll-auto`}
    >
      <body className="font-[family-name:var(--font-dm-sans)]">
        <LayoutProvider>
          <a className="fixed -top-25 left-4 z-30 rounded-lg bg-(--accent) px-4 py-3 text-(--on-accent) focus:top-2.5" href="#main-content">Skip to content</a>
          <Navbar />
          <div className="mx-auto grid max-w-[1680px] grid-cols-[minmax(0,1fr)] gap-0 px-4 pb-10 min-[641px]:gap-8 min-[641px]:px-8 min-[641px]:pb-16 min-[901px]:grid-cols-[240px_minmax(0,1fr)]">
            <Sidebar />
            {children}
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
