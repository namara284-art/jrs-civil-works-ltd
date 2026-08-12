import { z } from "zod";
import { siteConfig } from "@/site.config";

/**
 * Enquiry payload, shared by the client form and the API route so validation
 * rules can never drift between them.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is too long."),
  organisation: z
    .string()
    .trim()
    .max(160, "That organisation name is too long.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a contactable phone number.")
    .max(32, "That phone number is too long.")
    .regex(/^[+()\-.\s\d]+$/, "Use digits, spaces and + ( ) - only."),
  service: z.enum(siteConfig.serviceOptions, {
    message: "Please choose the service you need.",
  }),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us where the project is.")
    .max(160, "That location is too long."),
  details: z
    .string()
    .trim()
    .min(20, "Please give at least a sentence or two about the project.")
    .max(4000, "Please keep the description under 4000 characters."),

  /* --- spam protection, never shown to a human --- */
  /**
   * Honeypot. A human never sees this field, so anything in it means a bot.
   * Deliberately permissive here: the API route accepts the submission and
   * returns success without delivering it, so an automated client gets no
   * signal that it was caught. Rejecting it in the schema would hand back a
   * field-level error naming the trap.
   */
  company_website: z.string().max(2000).optional(),
  /** Milliseconds the form was on screen before submission. */
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Field-level errors keyed by field name, as returned by the API route. */
export type EnquiryFieldErrors = Partial<
  Record<keyof EnquiryInput, string>
>;
