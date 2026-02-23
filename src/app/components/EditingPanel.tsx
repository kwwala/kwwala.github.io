import { forwardRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

import { EDITING_CREATORS } from "@/app/data/editing";

type EditingPanelProps = {
  className: string;
};

export const EditingPanel = forwardRef<HTMLDivElement, EditingPanelProps>(
  ({ className }, ref) => {
    const [openCreatorId, setOpenCreatorId] = useState<string | null>(null);
    const [activatedCreatorIds, setActivatedCreatorIds] = useState<
      Record<string, boolean>
    >({});
    const [loadedEmbeds, setLoadedEmbeds] = useState<Record<string, boolean>>(
      {},
    );
    const [hiddenVideoTitles, setHiddenVideoTitles] = useState<
      Record<string, boolean>
    >({});

    return (
      <div ref={ref} className={className}>
        <div className="space-y-3">
          {EDITING_CREATORS.map((creator) => {
            const isOpen = openCreatorId === creator.id;
            const isActivated = !!activatedCreatorIds[creator.id];

            return (
              <article
                key={creator.id}
                className="rounded-md border border-white/10 bg-black/25 transition-colors hover:border-[#3c9]"
              >
                <div className="flex w-full items-center justify-between gap-4 px-4 py-3">
                  <a
                    className="group/creator flex items-center gap-3 pr-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c9] focus-visible:ring-offset-2 cursor-pointer"
                    href={creator.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="h-10 w-10 rounded-full border border-white/20 object-cover transition-colors group-hover/creator:border-[#3c9] group-focus-visible/creator:border-[#3c9]"
                    />
                    <span className="text-sm font-bold text-zinc-100 transition-colors group-hover/creator:text-[#3c9] group-focus-visible/creator:text-[#3c9]">
                      {creator.name}
                    </span>
                  </a>
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
                    className="cursor-pointer rounded-xl  p-2 text-zinc-500 transition-colors duration-300 ease-[cubic-bezier(.1,0,0,1)] hover:text-[#3c9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c9] focus-visible:ring-offset-2 border borde border-transparent hover:border-[#3c9] focus-visible:border-[#3c9]"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Close" : "Open"} ${creator.name} videos`}
                  >
                    <span
                      aria-hidden="true"
                      className={`block duration-300 ease-[cubic-bezier(.1,0,0,1)] ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <FaAngleUp className="h-3 w-3" />
                    </span>
                  </button>
                </div>

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
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 pr-1">
                          {creator.videos.map((video) => {
                            const embedKey = `${creator.id}-${video.id}`;
                            const isEmbedLoaded = !!loadedEmbeds[embedKey];
                            const isTitleHidden = !!hiddenVideoTitles[embedKey];

                            return (
                              <article
                                key={embedKey}
                                className="group relative w-80 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/40 transition-colors hover:border-[#3c9]"
                              >
                                {!isEmbedLoaded && (
                                  <div className="absolute inset-0 z-0">
                                    <img
                                      src={video.thumbnailUrl}
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
    );
  },
);

EditingPanel.displayName = "EditingPanel";
