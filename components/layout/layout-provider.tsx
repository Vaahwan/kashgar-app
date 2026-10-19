"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type LayoutContextValue = {
  theme: "dark" | "light";
  toggleTheme: () => void;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{
      theme,
      toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
      menuOpen,
      toggleMenu: () => setMenuOpen((current) => !current),
      closeMenu: () => setMenuOpen(false),
    }}>
      <div
        className="min-h-screen bg-(--bg) text-(--text) antialiased [--header-height:124px] min-[641px]:[--header-height:68px]"
        data-theme={theme}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider.");
  return context;
}