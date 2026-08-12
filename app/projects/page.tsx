import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CTAPanel } from "@/components/sections/CTAPanel";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Work carried out by JRS Civil Works Ltd across roads and transport, earthworks and site development, buildings and structures, drainage and water, materials and quarrying, and plant and equipment.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        index="06"
        title="Our"
        titleSecondary="work"
        intro="A view of the work JRS Civil Works Ltd carries out, filtered by type. Detailed project write-ups are being prepared and will be published here as they are released."
        image={{
          src: "/images/excavator-fleet.jpg",
          alt: "A line of tracked excavators parked in a yard ahead of deployment, with personnel alongside.",
        }}
      />

      <ProjectGallery />

      <CTAPanel
        eyebrow="Project references"
        title="Looking for work like yours?"
        body="Tell us the type of works you are planning and we will share what is relevant, along with a practical approach to delivery."
        secondary={{ href: "/services", label: "Explore Our Services" }}
        image={{ src: "/images/rock-breaker.jpg", alt: "" }}
      />
    </>
  );
}
