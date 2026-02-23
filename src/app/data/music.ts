import type { IconType } from "react-icons";
import {
  TbBrandApple,
  TbBrandBandcamp,
  TbBrandSoundcloud,
  TbBrandSpotify,
  TbBrandYoutube,
} from "react-icons/tb";

import type { MusicPlatform, Song } from "../types";

export const SONGS: Song[] = [
  {
    id: "song-1",
    title: "Song Title 01",
    artist: "kwwala",
    description:
      "Description of the track, mood and context. Keep it short and clear.",
    coverUrl: "https://picsum.photos/seed/song-1/320",
    urls: {
      spotify: "https://open.spotify.com/track/YOUR_TRACK_ID_1",
      appleMusic: "https://music.apple.com/track/YOUR_TRACK_ID_1",
      soundcloud: "https://soundcloud.com/artist-name/song-title-01",
      youtube: "https://www.youtube.com/watch?v=qDQw4w9WgXcQ",
    },
  },
  {
    id: "song-2",
    title: "Song Title 02",
    artist: "other artist",
    remix: "flip",
    description:
      "Second release template. Use this space for notes, story or credits.",
    coverUrl: "https://picsum.photos/seed/song-2/320",
    urls: {
      spotify: "https://open.spotify.com/track/YOUR_TRACK_ID_2",
      appleMusic: "https://music.apple.com/track/YOUR_TRACK_ID_2",
      soundcloud: "https://soundcloud.com/artist-name/song-title-02",
    },
  },
  {
    id: "song-3",
    title: "asdfghjkl",
    artist: "kwwala",
    description: "another track description.",
    coverUrl: "https://picsum.photos/seed/song-3/320",
    urls: {
      spotify: "https://open.spotify.com/track/YOUR_TRACK_ID_3",
      appleMusic: "https://music.apple.com/track/YOUR_TRACK_ID_3",
      youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      bandcamp: "https://artistname.bandcamp.com/track/song-title-03",
    },
  },
];

export const MUSIC_PLATFORM_ORDER: MusicPlatform[] = [
  "spotify",
  "appleMusic",
  "soundcloud",
  "youtube",
  "bandcamp",
];

export const MUSIC_PLATFORM_META: Record<
  MusicPlatform,
  { label: string; icon: IconType }
> = {
  spotify: {
    label: "spotify",
    icon: TbBrandSpotify,
  },
  appleMusic: {
    label: "apple music",
    icon: TbBrandApple,
  },
  soundcloud: {
    label: "soundcloud",
    icon: TbBrandSoundcloud,
  },
  youtube: {
    label: "youtube",
    icon: TbBrandYoutube,
  },
  bandcamp: {
    label: "bandcamp",
    icon: TbBrandBandcamp,
  },
};
