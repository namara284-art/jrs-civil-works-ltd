"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  projectCategories,
  projectItems,
  type ProjectCategory,
} from "@/content/projects";

type Filter = ProjectCategory | "all";

/**
 * Filterable work gallery.
 *
 * Every card describes what its photograph shows and the type of work it
 * represents. No project names, clients, values, locations or dates appear
 * anywhere — none have been supplied, and none are invented. Each filtered view
 * closes with a clearly labelled "Project updates coming soon" panel.
 */
export function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "all"
        ? projectItems
        : projectItems.filter((p) => p.category === filter),
    [filter],
  );

  const activeLabel =
    filter === "all"
      ? "all categories"
      : projectCategories.find((c) => c.slug === filter)?.label.toLowerCase();

  const filters: { slug: Filter; label: string }[] = [
    { slug: "all", label: "All work" },
    ...projectCategories,
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="border-y border-line py-5">
          <h2 className="sr-only">Filter work by category</h2>
          <ul className="flex flex-wrap gap-x-2 gap-y-3">
            {filters.map((f) => {
              const active = filter === f.slug;
              return (
                <li key={f.slug}>
                  <button
                    type="button"
                    onClick={() => setFilter(f.slug)}
                    aria-pressed={active}
                    className={`border px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                      active
                        ? "border-navy bg-navy text-white"
                        : "border-line bg-white text-charcoal hover:border-teal hover:text-teal"
                    }`}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Announces the filtered result to assistive technology. */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "item" : "items"} in{" "}
          {activeLabel}.
        </p>

        <motion.ul
          layout={!reduced}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                data-reveal=""
                key={item.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={item.orientation === "portrait" ? "sm:row-span-2" : ""}
              >
                <article className="group flex h-full flex-col border border-line bg-white transition-colors duration-300 hover:border-teal/45">
                  {/* Portrait cards span two rows, so the image grows to fill
                      the extra height rather than leaving the card hollow. */}
                  <div
                    className={`relative overflow-hidden bg-mist ${
                      item.orientation === "portrait"
                        ? "aspect-[3/4] sm:aspect-auto sm:min-h-72 sm:flex-1"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-0 top-0 bg-navy/92 px-3 py-2 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white">
                      {projectCategories.find((c) => c.slug === item.category)?.label}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[1.25rem] leading-[1.05] transition-colors duration-300 group-hover:text-teal">
                      {item.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-[2px] w-8 bg-teal transition-[width] duration-500 ease-out group-hover:w-16"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                      {item.caption}
                    </p>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Honest placeholder while written case studies are prepared. */}
        <div className="mt-10 border border-dashed border-line bg-mist p-8 lg:p-12">
          <p className="eyebrow">Project updates coming soon</p>
          <p className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[1.05] lg:text-3xl">
            Detailed case studies for {activeLabel} are being prepared
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-charcoal-600">
            The gallery above shows work types JRS Civil Works Ltd carries out.
            Full project write-ups, with scope and delivery detail, will be
            published here as they are released.{" "}
            <Link
              href="/contact#enquiry"
              className="font-semibold text-teal underline underline-offset-4 transition-colors hover:text-navy"
            >
              Request project references
            </Link>{" "}
            for a specific type of work.
          </p>
        </div>
      </Container>
    </section>
  );
}
