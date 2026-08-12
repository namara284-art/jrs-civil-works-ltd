import Image from "next/image";
import type { Equipment } from "@/content/equipment";

/**
 * Equipment card: photograph, title, role. On hover the image lifts slightly in
 * scale, a navy panel slides up from the base and the teal rule extends.
 */
export function EquipmentCard({
  item,
  index,
  priority = false,
}: {
  item: Equipment;
  index: number;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-white transition-colors duration-300 hover:border-navy/25">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, (min-width: 640px) 46vw, 92vw"
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Index tab, in the profile's angled-label spirit but squared off. */}
        <span className="absolute left-0 top-0 bg-navy px-3 py-2 font-display text-sm leading-none text-white">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Navy wash that rises on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-navy/85 transition-[height] duration-500 ease-out group-hover:h-full"
        />

        {/* Role copy revealed over the wash. */}
        <span className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm leading-relaxed text-white">{item.role}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="font-display text-[1.25rem] leading-[1.05] transition-colors duration-300 group-hover:text-teal lg:text-[1.375rem]">
          {item.name}
        </h3>
        <span
          aria-hidden="true"
          className="mt-3 block h-[2px] w-8 bg-teal transition-[width] duration-500 ease-out group-hover:w-16"
        />
        <p className="mt-3 text-sm leading-relaxed text-charcoal-600 lg:hidden">
          {item.role}
        </p>
      </div>
    </article>
  );
}
