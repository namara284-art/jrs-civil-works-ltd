/**
 * Plant and equipment categories, exactly as presented in the company profile
 * (pages 06 and 07). Images are crops taken from those profile pages.
 */

export type EquipmentGroup = "fleet" | "specialised";

export type Equipment = {
  slug: string;
  name: string;
  group: EquipmentGroup;
  /** One-line description of what the category supports on site. */
  role: string;
  image: { src: string; alt: string };
};

export const equipmentGroups: Record<
  EquipmentGroup,
  {
    title: string;
    /** Heading split across two lines, navy over charcoal. */
    titleLead: string;
    titleTail: string;
    index: string;
    intro: string;
  }
> = {
  fleet: {
    title: "Plant & Equipment Fleet",
    titleLead: "Plant & Equipment",
    titleTail: "Fleet",
    index: "01",
    intro:
      "JRS Civil Works Ltd deploys reliable construction equipment to support efficient delivery across infrastructure, concrete works and site operations.",
  },
  specialised: {
    title: "Specialised Plant & Lifting Equipment",
    titleLead: "Specialised Plant &",
    titleTail: "Lifting Equipment",
    index: "02",
    intro:
      "JRS Civil Works Ltd also supports quarrying, lifting and heavy-duty site operations through specialised machinery tailored to demanding project environments.",
  },
};

export const equipment: Equipment[] = [
  {
    slug: "concrete-mixer",
    name: "Concrete Mixer",
    group: "fleet",
    role: "Transit mixing and delivery of ready concrete to the pour face.",
    image: {
      src: "/images/equipment/concrete-mixer.jpg",
      alt: "A JRS-branded truck-mounted concrete mixer parked on a compacted site surface.",
    },
  },
  {
    slug: "concrete-pump",
    name: "Concrete Pump",
    group: "fleet",
    role: "Placing concrete at height and across restricted-access pours.",
    image: {
      src: "/images/equipment/concrete-pump.jpg",
      alt: "A JRS-branded truck-mounted concrete pump with its boom folded over the chassis.",
    },
  },
  {
    slug: "dump-truck",
    name: "Dump Truck",
    group: "fleet",
    role: "Bulk movement of spoil, hardcore and fill across and between sites.",
    image: {
      src: "/images/equipment/dump-truck.jpg",
      alt: "A JRS-branded six-wheel dump truck loaded with material on a construction site.",
    },
  },
  {
    slug: "tipper-truck",
    name: "Tipper Truck",
    group: "fleet",
    role: "Haulage of aggregates, gravel and sand to the point of use.",
    image: {
      src: "/images/equipment/tipper-truck.jpg",
      alt: "A JRS-branded tipper truck with a high-sided body standing ready for loading.",
    },
  },
  {
    slug: "water-bowser",
    name: "Water Bowser",
    group: "fleet",
    role: "Dust suppression and moisture control for compaction works.",
    image: {
      src: "/images/equipment/water-bowser.jpg",
      alt: "A JRS-branded water bowser tanker truck with a walkway rail along the tank.",
    },
  },
  {
    slug: "air-compressor",
    name: "Air Compressor",
    group: "fleet",
    role: "Powering pneumatic tools for breaking, drilling and cleaning.",
    image: {
      src: "/images/equipment/air-compressor.jpg",
      alt: "A JRS-branded towable site air compressor unit standing on aggregate ground.",
    },
  },
  {
    slug: "stone-crushers",
    name: "Stone Crushers",
    group: "specialised",
    role: "Primary reduction of quarried rock into workable aggregate sizes.",
    image: {
      src: "/images/equipment/stone-crushers.jpg",
      alt: "A JRS-branded tracked mobile stone crusher working over a bed of crushed rock.",
    },
  },
  {
    slug: "crusher-plant",
    name: "Crusher Plant",
    group: "specialised",
    role: "Continuous crushing, screening and grading of construction materials.",
    image: {
      src: "/images/equipment/crusher-plant.jpg",
      alt: "A JRS-branded static crusher plant with feed hoppers, conveyors and steel access gantries.",
    },
  },
  {
    slug: "hydraulic-rock-breaker",
    name: "Hydraulic Rock Breaker",
    group: "specialised",
    role: "Breaking oversize rock, concrete and hard strata in excavation works.",
    image: {
      src: "/images/equipment/hydraulic-rock-breaker.jpg",
      alt: "A JRS-branded hydraulic rock breaker attachment on an excavator arm, poised over broken stone.",
    },
  },
  {
    slug: "forklift",
    name: "Forklift",
    group: "specialised",
    role: "Materials handling around yards, stores and structural work areas.",
    image: {
      src: "/images/equipment/forklift.jpg",
      alt: "A JRS-branded counterbalance forklift beside precast concrete panels.",
    },
  },
  {
    slug: "mobile-crane",
    name: "Mobile Crane",
    group: "specialised",
    role: "Lifting and placing structural elements and heavy site components.",
    image: {
      src: "/images/equipment/mobile-crane.jpg",
      alt: "A JRS-branded truck-mounted mobile crane with its telescopic boom and hook block rigged.",
    },
  },
  {
    slug: "tower-crane",
    name: "Tower Crane",
    group: "specialised",
    role: "Sustained vertical lifting on multi-storey building programmes.",
    image: {
      src: "/images/equipment/tower-crane.jpg",
      alt: "A JRS-branded tower crane standing over a reinforced concrete building under construction.",
    },
  },
];

export const equipmentByGroup = (group: EquipmentGroup) =>
  equipment.filter((e) => e.group === group);
