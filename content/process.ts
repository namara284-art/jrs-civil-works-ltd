/**
 * "How We Deliver" — the three-stage delivery model from the company profile
 * (page 04, Civil Works Delivery).
 */

export type ProcessStage = {
  index: string;
  title: string;
  description: string;
  /** Concrete activities within the stage, drawn from the profile wording. */
  activities: string[];
  image: { src: string; alt: string };
};

export const processIntro =
  "JRS Civil Works Ltd manages projects through a practical delivery model that connects planning, implementation and accountable completion.";

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Planning & Preparation",
    description:
      "We review drawings, quantities, site conditions, access, materials and equipment requirements before mobilisation.",
    activities: [
      "Drawing and quantity review",
      "Site condition and access assessment",
      "Materials and equipment scheduling",
      "Mobilisation planning",
    ],
    image: {
      src: "/images/jrs-signage.jpg",
      alt: "JRS Civil Works Ltd site signage and information boards set up at a project entrance.",
    },
  },
  {
    index: "02",
    title: "Execution & Supervision",
    description:
      "We manage labour, plant, materials and daily site activities with close supervision, quality control and progress tracking.",
    activities: [
      "Labour and plant coordination",
      "Daily site supervision",
      "In-process quality control",
      "Progress tracking and reporting",
    ],
    image: {
      src: "/images/grader-close.jpg",
      alt: "A motor grader trimming a road formation close to a completed concrete bridge structure.",
    },
  },
  {
    index: "03",
    title: "Quality, Safety & Handover",
    description:
      "We complete works to specification, maintain safe sites, address defects and hand over finished works in line with client expectations.",
    activities: [
      "Completion to specification",
      "Safe site management and PPE control",
      "Defect identification and correction",
      "Inspection and handover",
    ],
    image: {
      src: "/images/road-tarmac.jpg",
      alt: "A completed sealed road curving through green countryside, with a road user travelling along it.",
    },
  },
];

/** Quality and safety commitments, from profile page 08. */
export const qualityCommitments = [
  {
    title: "Quality Commitment",
    body: "JRS Civil Works Ltd is committed to workmanship that meets agreed specifications. Quality control starts with material selection and continues through construction, inspection and completion.",
  },
  {
    title: "Health, Safety & Environment",
    body: "The company treats health and safety as part of project planning and daily site management. Attention is given to PPE, safe equipment operation, site control, hazard identification, environmental care and responsible work practices.",
  },
];
