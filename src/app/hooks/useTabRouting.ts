import { useEffect, useState } from "react";

import { pathToTab, tabToPath, tabToTitle } from "../constants/tabs";
import type { Tab } from "../types";

export const useTabRouting = () => {
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    pathToTab(window.location.pathname),
  );

  useEffect(() => {
    const currentPath = window.location.pathname;
    const nextPath = tabToPath(activeTab);

    if (currentPath !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  }, [activeTab]);

  useEffect(() => {
    document.title = tabToTitle(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(pathToTab(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { activeTab, setActiveTab };
};
