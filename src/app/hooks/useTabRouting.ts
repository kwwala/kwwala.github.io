import { useEffect, useState } from "react";

import {
  NOT_FOUND_TITLE,
  pathToTab,
  tabToPath,
  tabToTitle,
} from "@/app/constants/tabs";
import type { Tab } from "@/app/types";

export const useTabRouting = () => {
  const [routeTab, setRouteTab] = useState<Tab | null>(() =>
    pathToTab(window.location.pathname),
  );

  const activeTab = routeTab ?? "home";
  const isNotFound = routeTab === null;

  useEffect(() => {
    if (routeTab === null) {
      document.title = NOT_FOUND_TITLE;
      return;
    }

    const currentPath = window.location.pathname;
    const nextPath = tabToPath(routeTab);

    if (currentPath !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }

    document.title = tabToTitle(routeTab);
  }, [routeTab]);

  useEffect(() => {
    const handlePopState = () => {
      setRouteTab(pathToTab(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const setActiveTab = (tab: Tab) => {
    setRouteTab(tab);
  };

  return { activeTab, isNotFound, setActiveTab };
};
