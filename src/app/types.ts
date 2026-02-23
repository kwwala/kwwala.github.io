import type { IconType } from "react-icons";

export type Tab = "home" | "music" | "editing" | "socials";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type CreatorVideo = {
  id: string;
  title: string;
  videoId: string;
};

export type MusicPlatform =
  | "spotify"
  | "appleMusic"
  | "soundcloud"
  | "youtube"
  | "bandcamp";

export type Song = {
  id: string;
  title: string;
  artist: string;
  remix?: string;
  description: string;
  coverUrl: string;
  urls: Partial<Record<MusicPlatform, string>>;
};

export type EditingCreator = {
  id: string;
  name: string;
  channelHandle: string;
  avatarUrl: string;
  playlistUrl: string;
  videos: CreatorVideo[];
};
