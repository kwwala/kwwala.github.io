import type { RefObject } from "react";

import { ALL_TABS } from "../constants/tabs";
import type { Tab } from "../types";

type TabNavigationProps = {
  activeTab: Tab;
  navRef: RefObject<HTMLElement | null>;
  onTabChange: (tab: Tab) => void;
  setTabButtonRef: (tab: Tab) => (element: HTMLButtonElement | null) => void;
  tabIndicator: {
    left: number;
    width: number;
  };
};

export const TabNavigation = ({
  activeTab,
  navRef,
  onTabChange,
  setTabButtonRef,
  tabIndicator,
}: TabNavigationProps) => {
  return (
    <nav
      ref={navRef}
      className="relative mb-5 flex gap-6 border-b border-white/10 pb-4 text-sm tracking-[0.16em]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px h-px bg-[#3c9] transition-[transform,width] duration-500 ease-[cubic-bezier(.1,0,0,1)]"
        style={{
          transform: `translateX(${tabIndicator.left}px)`,
          width: `${tabIndicator.width}px`,
        }}
      />
      {ALL_TABS.map((tab) => (
        <button
          type="button"
          key={tab}
          ref={setTabButtonRef(tab)}
          onClick={() => onTabChange(tab)}
          className={`relative font-semibold transition-all duration-200 ease-[cubic-bezier(.1,0,0,1)] hover:-translate-y-0.75 ${
            activeTab === tab ? "text-[#3c9]" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};
