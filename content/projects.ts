/**
 * Projects.
 *
 * IMPORTANT — no project names, client names, contract values, locations,
 * dates or performance claims appear anywhere in this file. None have been
 * supplied by JRS Civil Works Ltd, and none may be invented.
 *
 * What follows is a work gallery built only from photography held in this
 * repository. Each caption describes what the photograph shows and the type of
 * work it represents. Full case studies are marked as forthcoming, and the
 * Projects page renders a clearly labelled "Project updates coming soon" state
 * for every category.
 *
 * TO ADD A REAL CASE STUDY
 * 1. Drop the images into `public/images/`.
 * 2. Add an entry below with `caseStudy: true` and fill in `detail`.
 * 3. Only include facts confirmed in writing by the company.
 */

export type ProjectCategory =
  | "roads-transport"
  | "earthworks-site-development"
  | "buildings-structures"
  | "drainage-water"
  | "materials-quarrying"
  | "plant-equipment";

export const projectCategories: {
  slug: ProjectCategory;
  label: string;
}[] = [
  { slug: "roads-transport", label: "Roads & Transport" },
  { slug: "earthworks-site-development", label: "Earthworks & Site Development" },
  { slug: "buildings-structures", label: "Buildings & Structures" },
  { slug: "drainage-water", label: "Drainage & Water" },
  { slug: "materials-quarrying", label: "Materials & Quarrying" },
  { slug: "plant-equipment", label: "Plant & Equipment" },
];

export type ProjectItem = {
  id: string;
  category: ProjectCategory;
  /** Describes the type of work shown — never a project or client name. */
  title: string;
  /** Factual description of what the photograph shows. */
  caption: string;
  image: { src: string; alt: string };
  /** Portrait items span one column and a taller row in the masonry grid. */
  orientation: "landscape" | "portrait";
  /** True only when a written, company-approved case study exists. */
  caseStudy: false;
};

export const projectItems: ProjectItem[] = [
  {
    id: "road-formation-grading",
    category: "roads-transport",
    title: "Road formation grading",
    caption:
      "A motor grader trimming a road formation to level, with a compaction roller following behind.",
    image: {
      src: "/images/grader-roller.jpg",
      alt: "A motor grader shaping a road formation on an open site with a compaction roller working behind it.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "grading-beside-structure",
    category: "roads-transport",
    title: "Grading alongside a bridge structure",
    caption:
      "Formation trimming next to a completed concrete bridge deck, ahead of surfacing works.",
    image: {
      src: "/images/grader-close.jpg",
      alt: "A motor grader trimming a road formation close to a completed concrete bridge structure.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "gravel-road-corridor",
    category: "roads-transport",
    title: "Gravel road corridor",
    caption: "A formed gravel carriageway running through cleared ground.",
    image: {
      src: "/images/murram-road.jpg",
      alt: "A wide gravel road corridor running through cleared bushland under an open sky.",
    },
    orientation: "portrait",
    caseStudy: false,
  },
  {
    id: "sealed-road-in-service",
    category: "roads-transport",
    title: "Sealed road in service",
    caption:
      "A completed sealed carriageway with edge marking, carrying everyday traffic.",
    image: {
      src: "/images/road-tarmac.jpg",
      alt: "A completed sealed road curving through green countryside, with a road user travelling along it.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "bulk-excavation",
    category: "earthworks-site-development",
    title: "Bulk excavation",
    caption:
      "A tracked excavator cutting into an embankment during bulk earthworks.",
    image: {
      src: "/images/excavator-earthworks.jpg",
      alt: "A tracked excavator cutting into a red-soil embankment during bulk earthworks, with the operator at the controls.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "excavator-fleet-mobilisation",
    category: "earthworks-site-development",
    title: "Excavator mobilisation",
    caption:
      "Tracked excavators lined up ahead of deployment to site.",
    image: {
      src: "/images/excavator-fleet.jpg",
      alt: "A line of tracked excavators parked in a yard ahead of deployment, with personnel alongside.",
    },
    orientation: "portrait",
    caseStudy: false,
  },
  {
    id: "loading-and-site-handling",
    category: "earthworks-site-development",
    title: "Loading and site handling",
    caption:
      "A wheel loader positioned for material handling on a working site.",
    image: {
      src: "/images/wheel-loader.jpg",
      alt: "A wheel loader photographed in black and white, its bucket resting on the ground.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "concrete-placement",
    category: "buildings-structures",
    title: "Concrete placement",
    caption:
      "A concrete pump boom placing concrete over a reinforced foundation, with crew guiding the pour.",
    image: {
      src: "/images/concrete-pump-site.jpg",
      alt: "A concrete pump boom placing concrete over a reinforced foundation raft while site crew guide the pour.",
    },
    orientation: "portrait",
    caseStudy: false,
  },
  {
    id: "structural-pour-at-height",
    category: "buildings-structures",
    title: "Structural pour at height",
    caption:
      "A pump boom extended over a structure during a placement that ran to the end of the working day.",
    image: {
      src: "/images/concrete-pump-dusk.jpg",
      alt: "A concrete pump boom silhouetted against a low sun as crew complete a pour on a structure.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "trench-excavation",
    category: "drainage-water",
    title: "Trench excavation",
    caption:
      "An excavator cutting a long drainage trench alongside a graded corridor, seen from above.",
    image: {
      src: "/images/excavator-aerial.jpg",
      alt: "Aerial view of an excavator cutting a long drainage trench alongside a graded corridor.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "crushing-and-screening",
    category: "materials-quarrying",
    title: "Crushing and screening",
    caption:
      "A crushing and screening plant with feed conveyors and graded stockpiles.",
    image: {
      src: "/images/crusher-plant-wide.jpg",
      alt: "A stone crushing and screening plant with conveyors and stockpiles at a materials yard.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "jaw-crushing-units",
    category: "materials-quarrying",
    title: "Jaw crushing units",
    caption:
      "Jaw crusher units set up on site for primary reduction of quarried rock.",
    image: {
      src: "/images/jaw-crushers.jpg",
      alt: "Two jaw crusher units standing on site, with flywheels and feed openings visible.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "screening-line",
    category: "materials-quarrying",
    title: "Screening line",
    caption:
      "A conveyor-fed screening line operating in the open at a materials site.",
    image: {
      src: "/images/quarry-panorama.jpg",
      alt: "A conveyor-fed screening line operating on open ground at a materials production site.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "material-haulage",
    category: "materials-quarrying",
    title: "Material haulage",
    caption: "A tipper truck loaded for haulage of aggregate to the point of use.",
    image: {
      src: "/images/tipper-truck-site.jpg",
      alt: "A loaded tipper truck standing ready to haul aggregate from a site.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "rock-breaking",
    category: "plant-equipment",
    title: "Rock breaking",
    caption:
      "A hydraulic breaker reducing oversize rock, with dust suppression in progress.",
    image: {
      src: "/images/rock-breaker.jpg",
      alt: "A hydraulic rock breaker mounted on an excavator arm breaking oversize rock, throwing up dust.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "breaking-in-confined-conditions",
    category: "plant-equipment",
    title: "Breaking in confined conditions",
    caption:
      "A hydraulic breaker working rock in a confined excavation under artificial light.",
    image: {
      src: "/images/rock-breaker-night.jpg",
      alt: "A hydraulic rock breaker working stone inside a confined excavation lit by site lighting.",
    },
    orientation: "portrait",
    caseStudy: false,
  },
  {
    id: "plant-and-support-fleet",
    category: "plant-equipment",
    title: "Plant and support fleet",
    caption:
      "Company plant and support vehicles assembled at a depot, in JRS livery.",
    image: {
      src: "/images/jrs-fleet.jpg",
      alt: "A tipper truck, excavator, water bowser, compressor and pick-up in JRS Civil Works Ltd livery assembled outside a depot.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
  {
    id: "container-and-materials-handling",
    category: "plant-equipment",
    title: "Container and materials handling",
    caption:
      "A container handler and haulage vehicles working a stacked container yard.",
    image: {
      src: "/images/container-handler.jpg",
      alt: "A container handler lifting a container in a yard stacked with shipping containers.",
    },
    orientation: "landscape",
    caseStudy: false,
  },
];

export const projectsByCategory = (category: ProjectCategory | "all") =>
  category === "all"
    ? projectItems
    : projectItems.filter((p) => p.category === category);

/**
 * No approved written case studies exist yet. While this is true, every
 * category renders the "Project updates coming soon" state beneath its gallery.
 */
export const hasCaseStudies = projectItems.some((p) => p.caseStudy);
