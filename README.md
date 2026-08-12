# JRS Civil Works Ltd — website

Marketing site for **JRS Civil Works Ltd**, a Ugandan civil engineering and
construction company. Built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 and Framer Motion, and prepared for deployment at
**https://jrscivilworksltd.com**.

_Building Infrastructure. Delivering with Precision._

---

## Local development

Requires Node 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js flat config) |
| `npm run typecheck` | TypeScript, no emit |

Run `npm run lint && npm run typecheck && npm run build` before deploying.

---

## Project layout

```
app/                    Routes (App Router)
  page.tsx              Home
  about/                About Us
  services/             Services
  how-we-deliver/       Delivery model
  sectors/              Sectors We Serve
  plant-and-equipment/  Plant & Equipment
  projects/             Projects (filterable)
  contact/              Contact + enquiry form
  api/enquiry/route.ts  Enquiry endpoint (validation, spam checks, delivery)
  opengraph-image.tsx   Generated 1200×630 social card
  robots.ts             robots.txt
  sitemap.ts            sitemap.xml
  globals.css           Design tokens, base styles, motion preferences

components/
  layout/               Header, Footer, navigation list
  sections/             Hero, PageHeader, SplitSection, SectionHeading,
                        ServiceCard, ServiceFeature, ProcessSteps, SectorGrid,
                        EquipmentCard, ProjectGallery, CTAPanel
  ui/                   Container, Button, Logo, Reveal, RevealImage, TealRule
  forms/                EnquiryForm

content/                All site copy as typed data
lib/                    Motion presets, SEO helpers, enquiry schema
site.config.ts          Contact details, domain, form settings
public/                 Web-ready images, brand assets, favicon
source-assets/          Original high-resolution photography and the profile PDF
```

---

## Asset locations

### Web-ready images — `public/images/`

Optimised derivatives, served through `next/image` (AVIF/WebP, responsive
`sizes`). Every image carries descriptive alt text defined alongside it in
`content/`.

- `public/images/*.jpg` — photography used across the site.
- `public/images/equipment/*.jpg` — the twelve plant categories, cropped from
  pages 06 and 07 of the company profile.

### Brand — `public/brand/`

| File | Use |
| --- | --- |
| `jrs-logo.png` | Full colour lockup, transparent background (997 × 430) |
| `jrs-logo-white.png` | Mono white knockout, for navy panels |
| `jrs-mark.png` / `jrs-mark-white.png` | Stacked symbol alone |
| `icon-512.png`, `icon-64.png`, `apple-icon.png` | App icons |
| `stack-navy.svg`, `stack-white.svg` | Structural chevron pattern tiles |

`public/favicon.ico` is generated from the stacked mark on navy.

### Originals — `source-assets/`

Untouched source material kept in the repository for future re-cropping:
the full-resolution photographs, `JRS Final Logo/`, `Profile Images/` (the
eight company-profile pages as PNGs) and `JRS Civil Works Ltd Profile_W.pdf`.
Nothing in this folder is served by the site.

**Regenerating web images.** Crop and compress from `source-assets/` with any
tool you like, then write the result into `public/images/` at the same filename.
Keep landscape photographs at 4:3 or 16:9 and equipment cards at 4:3 (1200 × 900),
quality ~82.

---

## Editing content

No CMS. All copy lives in typed files, so a change is a one-line edit and a
redeploy.

| File | Controls |
| --- | --- |
| `site.config.ts` | Company name, tagline, canonical domain, contact details, social links, service list used by the form, rate limits |
| `content/company.ts` | About page: introduction, vision, mission, core areas, why JRS, corporate objectives |
| `content/services.ts` | The six services — titles, descriptions, scope lists, images |
| `content/process.ts` | The three delivery stages and the quality/safety commitments |
| `content/sectors.ts` | Sectors served |
| `content/equipment.ts` | The twelve plant categories, grouped into fleet and specialised |
| `content/projects.ts` | Work gallery items and their categories |
| `components/layout/nav.ts` | Navigation order and labels |

### Contact details

The company profile ships these as placeholders (`[Insert]`, `[To be inserted]`),
so they are `null` in `site.config.ts`. **The site hides every unset field rather
than showing invented details**, and the contact page shows a short note
explaining that details are being finalised.

To publish real details, replace the `null`s:

```ts
contact: {
  email:  { value: "info@jrscivilworksltd.com" },
  phone:  { value: "+256 700 000 000" },
  address: { line1: "Plot 00, Example Road", city: "Kampala", country: "Uganda" },
},
corporate: { registrationNumber: "1234567890" /* … */ },
```

Everything that uses them — footer, contact page, structured data — picks them
up automatically. The same applies to `social`: set a URL and the icon appears
in the footer; leave it `null` and it stays hidden.

### Projects

`content/projects.ts` contains **no project names, client names, contract
values, locations, dates or performance claims** — none were supplied, and none
may be invented. Each entry describes what its photograph shows and the type of
work it represents. Every filtered view closes with a clearly labelled
"Project updates coming soon" panel.

To publish a real case study, add an entry with `caseStudy: true` and include
only facts confirmed in writing by the company.

---

## Form setup

The enquiry form posts to `POST /api/enquiry`. The route:

1. Rate-limits per IP (5 submissions per 10 minutes; tune in `site.config.ts`).
2. Validates against `lib/enquiry-schema.ts` — shared with the client, so the
   rules cannot drift.
3. Runs two silent spam checks: a hidden honeypot field, and a minimum
   time-on-form. Both return a success response so bots learn nothing.
4. Delivers the enquiry.

Delivery is pluggable. Set **one** of these and redeploy:

### Option A — webhook (works with Formspree, Zapier, Make, n8n, a CRM)

```bash
ENQUIRY_WEBHOOK_URL=https://…
```

The route POSTs JSON: all form fields plus `source` and `receivedAt`.

### Option B — email via [Resend](https://resend.com)

```bash
RESEND_API_KEY=re_…
ENQUIRY_TO_EMAIL=enquiries@jrscivilworksltd.com
ENQUIRY_FROM_EMAIL=enquiries@jrscivilworksltd.com   # verified sender
```

Emails are sent with the enquirer's address as `Reply-To`.

With neither configured the form still validates and confirms to the visitor,
and the submission is logged to the server console — useful in development, but
**set one before launch or enquiries will not reach anyone.**

Copy `.env.example` to `.env.local` for local work.

---

## Deployment to jrscivilworksltd.com

The site is a standard Next.js app. It needs a Node runtime for the enquiry
route; every page itself is statically prerendered.

### Vercel (recommended)

1. Import the repository at [vercel.com/new](https://vercel.com/new).
   Framework preset: **Next.js**. Build command, output directory and install
   command are all detected automatically.
2. Add the environment variables from **Form setup** under
   *Settings → Environment Variables* (Production, Preview, Development).
3. Deploy.
4. Under *Settings → Domains*, add `jrscivilworksltd.com` and
   `www.jrscivilworksltd.com`, then set `www` to redirect to the apex.
5. At your DNS provider, point the domain at Vercel:
   - `A` record — `@` → `76.76.21.21`
   - `CNAME` — `www` → `cname.vercel-dns.com`

   Vercel shows the exact values for your project; use those if they differ.
   HTTPS is provisioned automatically once DNS resolves.

### Any Node host

```bash
npm ci
npm run build
npm run start        # serves on $PORT, default 3000
```

Put it behind a reverse proxy terminating TLS for `jrscivilworksltd.com`.

### After the domain is live

- `site.config.ts → url` is already `https://jrscivilworksltd.com`. It drives
  canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml` — change it in
  one place if the domain ever changes.
- Submit `https://jrscivilworksltd.com/sitemap.xml` in Google Search Console.
- Check the share card at
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

---

## Design and accessibility notes

**Palette** — navy `#0A2540`, charcoal `#34383C`, steel teal `#257C8F`, white,
light gray `#F4F6F7`. No gradients anywhere; depth comes from flat colour
blocks, hairline rules and the stacked-chevron pattern.

**Type** — Barlow Condensed for headings, Manrope for body and navigation, both
self-hosted at build time by `next/font` (no runtime request to Google).

**Motion** — one easing curve, short travel, no bounce. Scroll reveals,
image settles, a scroll-tracked timeline spine, hover states and the mobile
drawer. `prefers-reduced-motion` is respected twice over: Framer Motion's
`useReducedMotion` skips the animation, and a CSS rule pins every `[data-reveal]`
element to its final state from the first paint — so content is visible even if
JavaScript is slow, blocked or absent.

**Accessibility** — semantic landmarks, a skip link, one `<h1>` per page with no
heading-level skips, labelled form fields with inline error text and
`role="alert"`, `aria-live` on the projects filter, visible focus rings, and
descriptive alt text on every content image (decorative images are
`aria-hidden` with empty alt).

Verified across 390 / 768 / 1024 / 1920 px with no horizontal overflow.
