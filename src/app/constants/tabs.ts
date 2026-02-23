import type { Tab } from "../types";

export const ALL_TABS: Tab[] = ["home", "music", "editing", "socials"];

const TAB_PATH_MAP: Record<Tab, string> = {
  home: "/",
  music: "/music",
  editing: "/editing",
  socials: "/socials",
};

const TAB_TITLE_MAP: Record<Tab, string> = {
  home: "kwwala // @imkwwala",
  music: "kwwala // music",
  editing: "kwwala // editing",
  socials: "kwwala // socials",
};

export const pathToTab = (pathname: string): Tab => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/music") {
    return "music";
  }

  if (normalizedPath === "/socials") {
    return "socials";
  }

  if (normalizedPath === "/editing") {
    return "editing";
  }

  return "home";
};

export const tabToPath = (tab: Tab): string => TAB_PATH_MAP[tab];

export const tabToTitle = (tab: Tab): string => TAB_TITLE_MAP[tab];
