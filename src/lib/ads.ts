import type { AdPlacement } from "./types";

export const defaultAds: AdPlacement[] = [
  {
    id: "home-banner",
    placement: "Homepage banner ad",
    headline: "Featured daily sponsor",
    body: "Premium banner area for brand campaigns, apps, marketplaces, or collecting leads.",
    cta: "Learn more",
    href: "#",
    active: true
  },
  {
    id: "sponsored-item",
    placement: "Sponsored item placement",
    headline: "Sponsored challenge slot",
    body: "Reserve this area for promoted products or featured daily challenges.",
    cta: "Sponsor",
    href: "#",
    active: true
  },
  {
    id: "rewarded-video",
    placement: "Rewarded video ad slot",
    headline: "Rewarded video",
    body: "Future video placement for hints, streak saves, or double-points rounds.",
    cta: "Watch",
    href: "#",
    active: true
  },
  {
    id: "sidebar-display",
    placement: "Sidebar display ad",
    headline: "Display ad",
    body: "Compact gameplay sidebar placement for static or network ads.",
    cta: "Open",
    href: "#",
    active: true
  },
  {
    id: "post-game",
    placement: "Post-game ad slot",
    headline: "Post-game offer",
    body: "Shown after a player completes the daily challenge and submits a name.",
    cta: "Claim",
    href: "#",
    active: true
  },
  {
    id: "leaderboard-banner",
    placement: "Leaderboard top banner ad",
    headline: "Leaderboard sponsor",
    body: "High-intent slot beside weekly and monthly competition stats.",
    cta: "View",
    href: "#",
    active: true
  }
];
