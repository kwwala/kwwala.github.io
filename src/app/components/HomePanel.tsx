import { forwardRef } from "react";

type HomePanelProps = {
  className: string;
  onSelectSocials: () => void;
};

export const HomePanel = forwardRef<HTMLDivElement, HomePanelProps>(
  ({ className, onSelectSocials }, ref) => {
    return (
      <div ref={ref} className={className}>
        <h1 className="text-[clamp(2rem,5vw,4rem)] leading-tight font-bold tracking-tighter text-zinc-100">
          kwwala
        </h1>
        <a
          href="/socials"
          onClick={(event) => {
            event.preventDefault();
            onSelectSocials();
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
    );
  },
);

HomePanel.displayName = "HomePanel";
