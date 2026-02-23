import { forwardRef } from "react";

import { SOCIAL_LINKS } from "@/app/data/socials";

type SocialsPanelProps = {
  className: string;
};

export const SocialsPanel = forwardRef<HTMLDivElement, SocialsPanelProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={className}>
        <ul className="space-y-3">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
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
    );
  },
);

SocialsPanel.displayName = "SocialsPanel";
