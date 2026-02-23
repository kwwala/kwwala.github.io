import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { IconType } from "react-icons";
import {
  TbBrandApple,
  TbBrandBandcamp,
  TbBrandBluesky,
  TbBrandInstagram,
  TbBrandSoundcloud,
  TbBrandSpotify,
  TbBrandTiktok,
  TbBrandTwitter,
  TbBrandYoutube,
} from "react-icons/tb";

import { PiLinktreeLogoBold } from "react-icons/pi";

import { HiOutlineMail } from "react-icons/hi";

import { FaAngleUp } from "react-icons/fa6";

type Tab = "home" | "music" | "editing" | "socials";

type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};
type CreatorVideo = {
  id: string;
  title: string;
  videoId: string;
};
type MusicPlatform =
  | "spotify"
  | "appleMusic"
  | "soundcloud"
  | "youtube"
  | "bandcamp";
type Song = {
  id: string;
  title: string;
  artist: string;
  remix?: string;
  description: string;
  coverUrl: string;
  urls: Partial<Record<MusicPlatform, string>>;
};
type EditingCreator = {
  id: string;
  name: string;
  channelHandle: string;
  avatarUrl: string;
  playlistUrl: string;
  videos: CreatorVideo[];
};

const allTabs: Tab[] = ["home", "music", "editing", "socials"];

const songs: Song[] = [
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
    description:
      "another track description.",
    coverUrl: "https://picsum.photos/seed/song-3/320",
    urls: {
      spotify: "https://open.spotify.com/track/YOUR_TRACK_ID_3",
      appleMusic: "https://music.apple.com/track/YOUR_TRACK_ID_3",
      youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      bandcamp: "https://artistname.bandcamp.com/track/song-title-03",
    },
  }
];

const musicPlatformOrder: MusicPlatform[] = [
  "spotify",
  "appleMusic",
  "soundcloud",
  "youtube",
  "bandcamp",
];

const musicPlatformMeta: Record<
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

const editingCreators: EditingCreator[] = [
  {
    id: "MRSOSYT1",
    name: "MRSOSYT",
    channelHandle: "@MRSOSYT1",
    avatarUrl:
      "https://yt3.googleusercontent.com/9rXoIv7xNSeATFMUrNN0phjKfGkF25mCH08dbqThenss_1fSFefvRWkCivIjnNn-Ihl8OjtFgHw=s160-c-k-c0x00ffffff-no-rj",
    playlistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_1",
    videos: [
      {
        id: "creator-template-1-video-1",
        title: "Video title 01",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "creator-template-1-video-2",
        title: "Video title 02",
        videoId: "M7lc1UVf-VE",
      },
      {
        id: "creator-template-1-video-3",
        title: "Video title 03",
        videoId: "aqz-KE-bpKQ",
      },
    ],
  },
  {
    id: "creator-template-2",
    name: "Creator 02",
    channelHandle: "@creator02",
    avatarUrl: "https://placehold.co/96x96/141414/ebebeb?text=C2",
    playlistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_2",
    videos: [
      {
        id: "creator-template-2-video-1",
        title: "Video title 04",
        videoId: "ScMzIvxBSi4",
      },
      {
        id: "creator-template-2-video-2",
        title: "Video title 05",
        videoId: "sBws8MSXN7A",
      },
      {
        id: "creator-template-2-video-3",
        title: "Video title 06",
        videoId: "ysz5S6PUM-U",
      },
    ],
  },
];

const pathToTab = (pathname: string): Tab => {
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

const tabToPath = (tab: Tab): string => {
  if (tab === "home") {
    return "/";
  }

  return `/${tab}`;
};

const tabToTitle = (tab: Tab): string => {
  if (tab === "music") {
    return "kwwala // music";
  }

  if (tab === "socials") {
    return "kwwala // socials";
  }

  if (tab === "editing") {
    return "kwwala // editing";
  }

  return "kwwala // @imkwwala";
};

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    pathToTab(window.location.pathname),
  );
  const [openCreatorId, setOpenCreatorId] = useState<string | null>(null);
  const [openSongId, setOpenSongId] = useState<string | null>(null);
  const [activatedSongIds, setActivatedSongIds] = useState<
    Record<string, boolean>
  >({});
  const [activatedCreatorIds, setActivatedCreatorIds] = useState<
    Record<string, boolean>
  >({});
  const [loadedEmbeds, setLoadedEmbeds] = useState<Record<string, boolean>>({});
  const [hiddenVideoTitles, setHiddenVideoTitles] = useState<
    Record<string, boolean>
  >({});
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const tabButtonRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    home: null,
    music: null,
    editing: null,
    socials: null,
  });
  const panelRefs = useRef<Record<Tab, HTMLDivElement | null>>({
    home: null,
    music: null,
    editing: null,
    socials: null,
  });

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
      if (
        currentHeight !== null &&
        Math.abs(currentHeight - nextHeight) < 0.5
      ) {
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

  const socials: SocialLink[] = [
    {
      label: "youtube",
      href: "https://youtube.com/@imkwwala",
      icon: TbBrandYoutube,
    },
    {
      label: "soundcloud",
      href: "https://soundcloud.com/imkwwala",
      icon: TbBrandSoundcloud,
    },
    {
      label: "twitter",
      href: "https://x.com/imkwwala",
      icon: TbBrandTwitter,
    },
    {
      label: "bluesky",
      href: "https://imkwwala.bsky.social",
      icon: TbBrandBluesky,
    },
    {
      label: "tiktok",
      href: "https://tiktok.com/@imkwwala",
      icon: TbBrandTiktok,
    },
    {
      label: "instagram",
      href: "https://instagram.com/imkwwala",
      icon: TbBrandInstagram,
    },
    {
      label: "linktree",
      href: "https://linktr.ee/imkwwala",
      icon: PiLinktreeLogoBold,
    },
    {
      label: "bandcamp",
      href: "https://kwwala.bandcamp.com",
      icon: TbBrandBandcamp,
    },
    {
      label: "email",
      href: "mailto:imkwwala@gmail.com",
      icon: HiOutlineMail,
    },
  ];

  const tabPanelClass = (tab: Tab): string => {
    const baseClass =
      "transition-[opacity,transform] duration-250 ease-[cubic-bezier(.1,0,0,1)]";

    if (activeTab === tab) {
      return `${baseClass} relative z-10 translate-y-0 opacity-100`;
    }

    return `${baseClass} pointer-events-none absolute inset-0 z-0 -translate-y-1 opacity-0`;
  };

  return (
    <main className="design-fade relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070707] px-5 py-12 text-zinc-100 sm:px-10">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 w-full max-w-3xl font-mono">
        {/* Disphing-style Navigation */}
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
          {allTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              ref={setTabButtonRef(tab)}
              onClick={() => setActiveTab(tab)}
              className={`relative font-semibold transition-all duration-200 ease-[cubic-bezier(.1,0,0,1)] hover:-translate-y-0.75 ${
                activeTab === tab
                  ? "text-[#3c9]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content Area with instant height updates */}
        {/* Added transition-[height] and the custom duration/ease to this container */}
        <div
          className="relative min-h-80 overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(.1,0,0,1)]"
          style={{
            ...(panelHeight === null ? {} : { height: `${panelHeight}px` }),
          }}
        >
          {/* HOME TAB */}
          <div ref={setPanelRef("home")} className={tabPanelClass("home")}>
            <h1 className="text-[clamp(2rem,5vw,4rem)] leading-tight font-bold tracking-tighter text-zinc-100">
              kwwala
            </h1>
            <a
              href="/socials"
              onClick={(event) => {
                event.preventDefault();
                setActiveTab("socials");
              }}
              className="text-[] text-zinc-500 w-fit cursor-pointer text-sm transition-all duration-200 ease-[cubic-bezier(.1,0,0,1)] hover:text-[#3c9] hover:pl-2"
            >
              @imkwwala
            </a>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
              hello!! i'm making music and editing videos on the internet!
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              he/him <span>&bull;</span> natal, br
            </p>
          </div>

          {/* MUSIC / SESSIONS TAB */}
          <div ref={setPanelRef("music")} className={tabPanelClass("music")}>
            <div className="space-y-3">
              {songs.map((song) => {
                const isOpen = openSongId === song.id;
                const isActivated = !!activatedSongIds[song.id];
                const remixText = song.remix?.trim();
                const displayRemix = remixText || song.artist;
                const showRemixInHeader =
                  displayRemix.trim().toLowerCase() !== "kwwala";

                return (
                  <article
                    key={song.id}
                    className="rounded-md border border-white/10 bg-black/25 transition-colors hover:border-[#3c9]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isOpen) {
                          setOpenSongId(null);
                          return;
                        }

                        if (!isActivated) {
                          setActivatedSongIds((prev) => ({
                            ...prev,
                            [song.id]: true,
                          }));
                          setOpenSongId(null);
                          window.requestAnimationFrame(() => {
                            setOpenSongId(song.id);
                          });
                          return;
                        }

                        setOpenSongId(song.id);
                      }}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      aria-expanded={isOpen}
                    >
                      <p className="text-sm font-semibold tracking-[0.04em] text-zinc-100">
                        {song.title}
                        {showRemixInHeader && (
                          <span className="text-zinc-400"> {displayRemix}</span>
                        )}
                      </p>
                      <span
                        aria-hidden="true"
                        className={`text-zinc-500 duration-300 ease-[cubic-bezier(.1,0,0,1)] ${
                          isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      >
                        <FaAngleUp className="h-3 w-3" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.1,0,0,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "pointer-events-none grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        {isActivated && (
                          <div
                            className={`border-t border-white/10 px-4 pb-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.1,0,0,1)] ${
                              isOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                            }`}
                          >
                            <div className="mt-4 grid gap-4 sm:grid-cols-[10.5rem_1fr]">
                              <div className="aspect-square overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                                <img
                                  src={song.coverUrl}
                                  alt={`Cover of ${song.title}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <h3 className="text-base font-bold text-zinc-100">
                                    {song.title}
                                    {remixText && (
                                      <span className="text-zinc-400">
                                        {" "}
                                        {remixText}
                                      </span>
                                    )}
                                  </h3>
                                  <p className="text-xs tracking-[0.12em] text-[#3c9]">
                                    {song.artist}
                                  </p>
                                </div>

                                <p className="text-sm leading-relaxed text-zinc-300">
                                  {song.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                  {musicPlatformOrder.map((platform) => {
                                    const href = song.urls[platform];

                                    if (!href) {
                                      return null;
                                    }

                                    const {
                                      icon: PlatformIcon,
                                      label,
                                    } = musicPlatformMeta[platform];

                                    return (
                                      <a
                                        key={`${song.id}-${platform}`}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Listen on ${label}`}
                                        className="group/platform inline-flex items-center rounded-sm border border-white/10 bg-black/30 p-2 text-xs tracking-[0.08em] text-zinc-300 transition-colors hover:border-[#3c9] hover:text-[#3c9]"
                                      >
                                        <PlatformIcon className="h-3.5 w-3.5" />
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* SOCIALS TAB */}
          <div
            ref={setPanelRef("socials")}
            className={tabPanelClass("socials")}
          >
            <ul className="space-y-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <li
                  key={label}
                  className="group w-fit transition-[padding-left] delay-50 duration-200 ease-[cubic-bezier(.1,0,0,1)] hover:delay-0 hover:ease-[cubic-bezier(.1,0,0,1)] hover:pl-2"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-zinc-200 transition-colors delay-50 duration-200 ease-[cubic-bezier(.1,0,0,1)] group-hover:delay-0 group-hover:ease-[cubic-bezier(.1,0,0,1)] group-hover:text-[#3c9]"
                  >
                    <span className="flex items-center justify-center">
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-zinc-500 transition-colors delay-50 duration-200 ease-[cubic-bezier(.1,0,0,1)] group-hover:delay-0 group-hover:ease-[cubic-bezier(.1,0,0,1)] group-hover:text-[#3c9]"
                      />
                    </span>
                    {label.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* EDITING TAB */}
          <div
            ref={setPanelRef("editing")}
            className={tabPanelClass("editing")}
          >
            <div className="space-y-3">
              {editingCreators.map((creator) => {
                const isOpen = openCreatorId === creator.id;
                const isActivated = !!activatedCreatorIds[creator.id];

                return (
                  <article
                    key={creator.id}
                    className="rounded-md border border-white/10 bg-black/25 transition-colors hover:border-[#3c9]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isOpen) {
                          setOpenCreatorId(null);
                          return;
                        }

                        if (!isActivated) {
                          setActivatedCreatorIds((prev) => ({
                            ...prev,
                            [creator.id]: true,
                          }));
                          setOpenCreatorId(null);
                          window.requestAnimationFrame(() => {
                            setOpenCreatorId(creator.id);
                          });
                          return;
                        }

                        setOpenCreatorId(creator.id);
                      }}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      aria-expanded={isOpen}
                    >
                      <a
                        className="group/creator flex items-center gap-3 pr-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c9] focus-visible:ring-offset-2"
                        href={`https://www.youtube.com/${creator.channelHandle}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={creator.avatarUrl}
                          alt={`${creator.name}`}
                          className="h-10 w-10 rounded-full border border-white/20 object-cover transition-colors group-hover/creator:border-[#3c9] group-focus-visible/creator:border-[#3c9]"
                        />
                        <span className="text-sm font-bold text-zinc-100 transition-colors group-hover/creator:text-[#3c9] group-focus-visible/creator:text-[#3c9]">
                          {creator.name}
                        </span>
                      </a>
                      <span
                        aria-hidden="true"
                        className={`text-zinc-500 duration-300 ease-[cubic-bezier(.1,0,0,1)] ${
                          isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      >
                        <FaAngleUp className="h-3 w-3 mt-3" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.1,0,0,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "pointer-events-none grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        {isActivated && (
                          <div
                            className={`border-t border-white/10 px-4 pb-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.1,0,0,1)] ${
                              isOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                            }`}
                          >
                            <div className="mt-3 flex items-center gap-4 text-xs tracking-[0.08em]">
                              <a
                                href={creator.playlistUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-500 transition-colors hover:text-[#3c9]"
                              >
                                playlist
                              </a>
                            </div>

                            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 pr-1">
                              {creator.videos.map((video) => {
                                const embedKey = `${creator.id}-${video.id}`;
                                const isEmbedLoaded = !!loadedEmbeds[embedKey];
                                const isTitleHidden =
                                  !!hiddenVideoTitles[embedKey];

                                return (
                                  <article
                                    key={embedKey}
                                    className="group relative w-80 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/40 transition-colors hover:border-[#3c9]"
                                  >
                                    {!isEmbedLoaded && (
                                      <div className="absolute inset-0 z-0">
                                        <img
                                          src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                                          alt=""
                                          aria-hidden="true"
                                          className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30" />
                                      </div>
                                    )}
                                    <iframe
                                      src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                                      title={video.title}
                                      loading="lazy"
                                      allow="web-share"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                      onLoad={() => {
                                        setLoadedEmbeds((prev) => ({
                                          ...prev,
                                          [embedKey]: true,
                                        }));
                                        setHiddenVideoTitles((prev) => ({
                                          ...prev,
                                          [embedKey]: true,
                                        }));
                                      }}
                                      className={`relative z-10 h-45 w-full border-0 transition-opacity duration-300 ${
                                        isEmbedLoaded
                                          ? "opacity-100"
                                          : "pointer-events-none opacity-0"
                                      }`}
                                    />
                                    <p
                                      className={`pointer-events-none absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black/90 via-black/55 to-transparent px-2 py-2 text-xs leading-snug text-zinc-100 transition-transform duration-500 ease-[cubic-bezier(.1,0,0,1)] ${
                                        isTitleHidden
                                          ? "translate-y-full"
                                          : "translate-y-0"
                                      }`}
                                    >
                                      {video.title}
                                    </p>
                                  </article>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
