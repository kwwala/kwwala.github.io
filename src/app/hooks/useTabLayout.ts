import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { Tab } from "@/app/types";

const createTabRecord = <TValue,>(value: TValue): Record<Tab, TValue> => ({
  home: value,
  music: value,
  editing: value,
  socials: value,
});

export const useTabLayout = (activeTab: Tab) => {
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const tabButtonRefs = useRef<Record<Tab, HTMLButtonElement | null>>(
    createTabRecord(null),
  );
  const panelRefs = useRef<Record<Tab, HTMLDivElement | null>>(
    createTabRecord(null),
  );

  const setTabButtonRef = useCallback(
    (tab: Tab) => (element: HTMLButtonElement | null) => {
      tabButtonRefs.current[tab] = element;
    },
    [],
  );

  const setPanelRef = useCallback(
    (tab: Tab) => (element: HTMLDivElement | null) => {
      panelRefs.current[tab] = element;
    },
    [],
  );

  const updateTabIndicator = useCallback(() => {
    const navElement = navRef.current;
    const tabElement = tabButtonRefs.current[activeTab];

    if (!navElement || !tabElement) {
      return;
    }

    const navRect = navElement.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();

    setTabIndicator({
      left: tabRect.left - navRect.left,
      width: tabRect.width,
    });
  }, [activeTab]);

  const updatePanelHeight = useCallback(() => {
    const activePanel = panelRefs.current[activeTab];

    if (!activePanel) {
      return;
    }

    const nextHeight = activePanel.getBoundingClientRect().height;

    setPanelHeight((currentHeight) => {
      if (currentHeight !== null && Math.abs(currentHeight - nextHeight) < 0.5) {
        return currentHeight;
      }

      return nextHeight;
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    updateTabIndicator();
  }, [updateTabIndicator]);

  useEffect(() => {
    const handleResize = () => {
      updateTabIndicator();
      updatePanelHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updatePanelHeight, updateTabIndicator]);

  useLayoutEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      updatePanelHeight();
    });

    if (typeof ResizeObserver === "undefined") {
      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }

    const activePanel = panelRefs.current[activeTab];

    if (!activePanel) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePanelHeight();
    });

    resizeObserver.observe(activePanel);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [activeTab, updatePanelHeight]);

  return {
    navRef,
    panelHeight,
    setPanelRef,
    setTabButtonRef,
    tabIndicator,
  };
};
