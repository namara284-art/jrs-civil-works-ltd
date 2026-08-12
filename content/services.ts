/**
 * Service portfolio — wording taken directly from the JRS company profile.
 * Edit copy here and it updates the home overview, the services page and the
 * enquiry form's service list.
 */

export type Service = {
  slug: string;
  index: string;
  title: string;
  /** Short line used on cards. */
  summary: string;
  /** Full profile description, used on the services page. */
  description: string;
  /** Scope items rendered as a checklist on the services page. */
  scope: string[];
  image: { src: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "road-works-transport-infrastructure",
    index: "01",
    title: "Road Works & Transport Infrastructure",
    summary:
      "Site clearing, earthworks, gravel works, compaction and road maintenance.",
    description:
      "Site clearing, earthworks, grading, gravel works, compaction, drainage construction and road maintenance.",
    scope: [
      "Site clearing and setting out",
      "Earthworks and formation grading",
      "Gravel and murram works",
      "Compaction and surface preparation",
      "Roadside drainage construction",
      "Routine and periodic road maintenance",
    ],
    image: {
      src: "/images/grader-roller.jpg",
      alt: "A motor grader shaping a road formation on an open site, with a compaction roller working behind it.",
    },
  },
  {
    slug: "earthworks-site-development",
    index: "02",
    title: "Earthworks & Site Development",
    summary:
      "Excavation, cut and fill, trenching, levelling and foundation preparation.",
    description:
      "Excavation, land clearing, cut and fill, trenching, backfilling, levelling and foundation preparation.",
    scope: [
      "Bulk and detailed excavation",
      "Land clearing and grubbing",
      "Cut and fill to design levels",
      "Service and pipeline trenching",
      "Backfilling and compaction",
      "Foundation and platform preparation",
    ],
    image: {
      src: "/images/excavator-earthworks.jpg",
      alt: "A tracked excavator cutting into a red-soil embankment during bulk earthworks, with the operator at the controls.",
    },
  },
  {
    slug: "building-structural-works",
    index: "03",
    title: "Building & Structural Works",
    summary:
      "Commercial, residential, institutional and industrial structures and concrete works.",
    description:
      "Commercial, residential, institutional and industrial structures, concrete works and renovations.",
    scope: [
      "Commercial and industrial buildings",
      "Residential and institutional structures",
      "Reinforced concrete works",
      "Formwork, steel fixing and casting",
      "Structural repairs and renovations",
      "Finishing and external works",
    ],
    image: {
      src: "/images/concrete-pour.jpg",
      alt: "Site crew placing concrete across a reinforced foundation raft, with the pump boom feeding the pour.",
    },
  },
  {
    slug: "drainage-water-infrastructure",
    index: "04",
    title: "Drainage & Water Infrastructure",
    summary:
      "Storm-water drains, culverts, channels and water-retaining structures.",
    description:
      "Storm-water drains, culverts, channels, water-retaining structures and pipeline-related civil works.",
    scope: [
      "Storm-water drains and channels",
      "Culvert installation and headwalls",
      "Lined and unlined channel works",
      "Water-retaining structures",
      "Pipeline-related civil works",
      "Outfall protection and erosion control",
    ],
    image: {
      src: "/images/excavator-aerial.jpg",
      alt: "Aerial view of an excavator cutting a long drainage trench alongside a graded corridor.",
    },
  },
  {
    slug: "construction-materials",
    index: "05",
    title: "Construction Materials",
    summary:
      "Aggregates, hardcore, crushed stone, gravel, sand and selected fill.",
    description:
      "Aggregates, hardcore, crushed stone, gravel, sand and selected fill materials.",
    scope: [
      "Crushed stone and aggregates",
      "Hardcore and selected fill",
      "Gravel and murram",
      "Sand supply",
      "Material haulage to site",
      "Stockpiling and site delivery scheduling",
    ],
    image: {
      src: "/images/crusher-plant-wide.jpg",
      alt: "A stone crushing and screening plant with conveyors and stockpiles at a materials yard.",
    },
  },
  {
    slug: "plant-equipment-fabrication",
    index: "06",
    title: "Plant, Equipment & Fabrication",
    summary:
      "Equipment-supported works, haulage, crushing, steel fabrication and welding.",
    description:
      "Equipment-supported works, haulage, crushing, structural steel fabrication and welding.",
    scope: [
      "Equipment-supported site works",
      "Haulage and material transport",
      "Crushing and screening operations",
      "Structural steel fabrication",
      "Welding and metalwork",
      "Plant maintenance support",
    ],
    image: {
      src: "/images/rock-breaker.jpg",
      alt: "A hydraulic rock breaker mounted on an excavator arm breaking oversize rock, throwing up dust.",
    },
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
