import { forwardRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

import { MUSIC_PLATFORM_META, MUSIC_PLATFORM_ORDER, SONGS } from "../data/music";

type MusicPanelProps = {
  className: string;
};

export const MusicPanel = forwardRef<HTMLDivElement, MusicPanelProps>(
  ({ className }, ref) => {
    const [openSongId, setOpenSongId] = useState<string | null>(null);
    const [activatedSongIds, setActivatedSongIds] = useState<Record<string, boolean>>(
      {},
    );

    return (
      <div ref={ref} className={className}>
        <div className="space-y-3">
          {SONGS.map((song) => {
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
                      isOpen ? "rotate-180" : "rotate-0"
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
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
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
                                  <span className="text-zinc-400"> {remixText}</span>
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
                              {MUSIC_PLATFORM_ORDER.map((platform) => {
                                const href = song.urls[platform];

                                if (!href) {
                                  return null;
                                }

                                const { icon: PlatformIcon, label } =
                                  MUSIC_PLATFORM_META[platform];

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
    );
  },
);

MusicPanel.displayName = "MusicPanel";
