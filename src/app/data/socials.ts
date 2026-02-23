import { HiOutlineMail } from "react-icons/hi";
import { PiLinktreeLogoBold } from "react-icons/pi";
import {
  TbBrandBandcamp,
  TbBrandBluesky,
  TbBrandInstagram,
  TbBrandSoundcloud,
  TbBrandTiktok,
  TbBrandTwitter,
  TbBrandYoutube,
} from "react-icons/tb";

import type { SocialLink } from "../types";

export const SOCIAL_LINKS: SocialLink[] = [
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
