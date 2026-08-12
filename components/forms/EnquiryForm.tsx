"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  enquirySchema,
  type EnquiryFieldErrors,
} from "@/lib/enquiry-schema";
import { siteConfig } from "@/site.config";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_BASE =
  "w-full border border-line bg-white px-4 py-3.5 text-sm text-charcoal transition-colors duration-200 placeholder:text-charcoal-600/45 focus:border-teal focus:outline-none focus:ring-0";

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-navy"
      >
        {label}
        {required ? (
          <span className="ml-1 text-teal" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-medium normal-case tracking-normal text-charcoal-600/70">
            (optional)
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-charcoal-600/80">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-semibold text-[#b3261e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  /** Set on mount, not at render time, so the render stays pure. */
  const mountedAt = useRef<number>(0);
  const successRef = useRef<HTMLDivElement>(null);

  /** Pre-selects the service when arriving from a service page. */
  const presetService = useMemo(() => {
    const requested = params.get("service");
    return requested && (siteConfig.serviceOptions as readonly string[]).includes(requested)
      ? requested
      : "";
  }, [params]);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so screen-reader users hear the result.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
    };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: EnquiryFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EnquiryFieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setFormError("Please check the highlighted fields and try again.");
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: EnquiryFieldErrors;
      };

      if (!res.ok || !body.ok) {
        setErrors(body.fieldErrors ?? {});
        setStatus("error");
        setFormError(
          body.message ??
            "We could not send your enquiry just now. Please try again in a moment.",
        );
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(
        "We could not reach the server. Please check your connection and try again.",
      );
    }
  }

  const invalid = (field: keyof EnquiryFieldErrors) =>
    errors[field] ? ({ "aria-invalid": true, "aria-describedby": `${field}-error` } as const) : {};

  if (status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border border-teal/40 bg-mist p-8 lg:p-12"
      >
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center bg-teal"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="m4 12 5.5 5.5L20 7" strokeLinecap="square" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-3xl leading-[1.05]">Enquiry received</h3>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-16 bg-teal" />
        <p className="mt-5 max-w-lg leading-relaxed text-charcoal-600">
          Thank you — your project enquiry has been sent to JRS Civil Works Ltd.
          A member of the team will review the details and respond directly.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setStatus("idle");
            mountedAt.current = Date.now();
          }}
        >
          Send another enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — positioned off-screen and hidden from assistive tech. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website (leave blank)</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            className={FIELD_BASE}
            {...invalid("name")}
          />
        </Field>

        <Field id="organisation" label="Organisation" error={errors.organisation}>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            placeholder="Company, institution or agency"
            className={FIELD_BASE}
            {...invalid("organisation")}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            className={FIELD_BASE}
            {...invalid("email")}
          />
        </Field>

        <Field id="phone" label="Phone number" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="+256 ..."
            className={FIELD_BASE}
            {...invalid("phone")}
          />
        </Field>

        <Field id="service" label="Service required" required error={errors.service}>
          <select
            id="service"
            name="service"
            required
            defaultValue={presetService}
            className={`${FIELD_BASE} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2334383C%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            {...invalid("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {siteConfig.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="location" label="Project location" required error={errors.location}>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="District, town or site"
            className={FIELD_BASE}
            {...invalid("location")}
          />
        </Field>
      </div>

      <Field
        id="details"
        label="Project details"
        required
        error={errors.details}
        hint="Scope, approximate size or quantities, programme and any drawings available."
      >
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          placeholder="Tell us what the project involves…"
          className={`${FIELD_BASE} resize-y`}
          {...invalid("details")}
        />
      </Field>

      <AnimatePresence>
        {formError ? (
          <motion.p
            role="alert"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-l-[3px] border-[#b3261e] bg-[#b3261e]/6 px-4 py-3 text-sm font-semibold text-[#b3261e]"
          >
            {formError}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button type="submit" disabled={status === "submitting"} withArrow>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs leading-relaxed text-charcoal-600/85">
          Fields marked <span className="text-teal">*</span> are required. Your
          details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
