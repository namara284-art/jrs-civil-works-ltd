/**
 * Sectors served, per the company profile (page 05). Icons are drawn inline as
 * simple geometry in `components/sections/SectorGrid.tsx` — no icon library and
 * no illustration style, to keep the mark language structural.
 */

export type SectorIcon =
  | "road"
  | "industrial"
  | "water"
  | "public"
  | "residential"
  | "quarry";

export type Sector = {
  slug: string;
  title: string;
  icon: SectorIcon;
  description: string;
};

export const sectorsIntro =
  "We deliver civil works solutions across a wide range of sectors, helping build stronger communities and sustainable infrastructure.";

export const sectors: Sector[] = [
  {
    slug: "roads-transport",
    title: "Roads & Transport Infrastructure",
    icon: "road",
    description:
      "Access roads, road formation, gravel works, drainage and maintenance for transport corridors.",
  },
  {
    slug: "commercial-industrial",
    title: "Commercial & Industrial Development",
    icon: "industrial",
    description:
      "Site development, foundations and structural works for commercial and industrial facilities.",
  },
  {
    slug: "water-agricultural",
    title: "Water & Agricultural Infrastructure",
    icon: "water",
    description:
      "Channels, water-retaining structures and pipeline-related civil works supporting water and agricultural schemes.",
  },
  {
    slug: "public-infrastructure",
    title: "Public Infrastructure",
    icon: "public",
    description:
      "Civil works for institutional and public-sector facilities, delivered to specification and programme.",
  },
  {
    slug: "real-estate-private",
    title: "Real Estate & Private Development",
    icon: "residential",
    description:
      "Land preparation, internal roads, drainage and structures for private and residential developments.",
  },
  {
    slug: "mining-quarrying",
    title: "Mining, Quarrying & Materials Operations",
    icon: "quarry",
    description:
      "Crushing, screening, haulage and site works supporting quarry and materials production.",
  },
];
