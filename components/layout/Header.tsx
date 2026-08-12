"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "./nav";

/**
 * Fixed header that compacts on scroll: the bar tightens, the logo steps down
 * and a hairline appears. The mobile menu slides in from the right and traps
 * nothing — it closes on route change, on Escape and on backdrop click.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes. Adjusted during render rather
  // than in an effect, so the drawer never paints open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes; lock the page behind the open drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-b border-line shadow-[0_1px_0_0_rgba(10,37,64,0.06)]" : "border-b border-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24"
          }`}
        >
          <Logo
            width={scrolled ? 132 : 156}
            priority
            className="shrink-0 transition-[width] duration-300"
          />

          <nav aria-label="Primary" className="hidden min-w-0 lg:block">
            <ul className="flex items-center gap-5 xl:gap-6 2xl:gap-8">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative block whitespace-nowrap py-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] transition-colors duration-200 xl:tracking-[0.16em] ${
                      isActive(item.href)
                        ? "text-teal"
                        : "text-charcoal hover:text-navy"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-teal transition-[width] duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Held back to 2xl so the seven nav labels never collide with it. */}
          <div className="hidden 2xl:block">
            <ButtonLink
              href="/contact#enquiry"
              className="whitespace-nowrap px-5 py-3 text-[0.6875rem]"
            >
              Request a Consultation
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-navy transition-transform duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[2px] w-6 bg-navy transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-navy transition-transform duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-navy/45 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            />
            <motion.div
              id="mobile-menu"
              className="fixed right-0 top-0 z-40 flex h-[100dvh] w-[min(22rem,88vw)] flex-col bg-white lg:hidden"
              initial={{ x: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-20 items-center border-b border-line px-6">
                <Logo width={140} />
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduced ? 0 : 0.06 + i * 0.045, duration: 0.3 }}
                      className="border-b border-line last:border-b-0"
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`flex items-center justify-between py-4 font-display text-2xl uppercase tracking-tight transition-colors ${
                          isActive(item.href) ? "text-teal" : "text-navy"
                        }`}
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-xs font-bold text-teal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-line p-6">
                <ButtonLink href="/contact#enquiry" className="w-full">
                  Request a Consultation
                </ButtonLink>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
