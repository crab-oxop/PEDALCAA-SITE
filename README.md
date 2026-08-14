# PedalCAA — Mobile Bike Repair Website

On-demand mobile bike repair marketing + booking site. "Roadside assistance
for bikes" — customers book online, a mechanic comes to them. Built with
Next.js (App Router), TypeScript, Tailwind CSS, Prisma (SQLite), and Stripe
Checkout.

> **"PedalCAA" is a placeholder business name.** Everything reads from
> [`src/lib/site-config.ts`](src/lib/site-config.ts) — update that one file
> (name, tagline, phone, email, service area) to rebrand the whole site.
> Search the codebase for `PedalCAA` to catch anything outside that file
> (mainly `package.json` and this README).

## What's here

| Page | Route |
| --- | --- |
| Home | `/` |
| Services & Pricing | `/services` |
| How It Works | `/how-it-works` |
| Book a Repair | `/book` → `/book/confirmation` |
| Membership | `/membership` |
| About | `/about` |
| Contact | `/contact` |
| Admin (job requests) | `/admin` (password-protected) |

Booking creates a `JobRequest` row in the database, optionally charges a
flat **dispatch fee** via Stripe Checkout (the pricing model here is a
call-out fee, like a tow truck — not a fixed all-in repair price, since the
actual repair cost depends on what's wrong), and emails a notification.
Every placeholder value (pricing, legal copy, testimonials, phone number,
photos) is flagged in the UI with `[PLACEHOLDER]` or a `// TODO:` comment in
the source — search for both before launch.

## Requirements

- Node.js 20+ and npm
- (Optional, for real payments) A [Stripe](https://dashboard.stripe.com/register) account, test mode
- (Optional, for real emails) A [Resend](https://resend.com) account

## Local setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000. The booking flow works out of the box with no
external accounts:

- **No `STRIPE_SECRET_KEY`?** Booking skips Stripe Checkout and confirms the
  job directly (a dev stub) so you can test the full flow end to end.
- **No `RESEND_API_KEY`?** Notification emails are logged to the terminal
  instead of sent.

## Environment variables

Copy `.env.example` to `.env` and fill in what you need. All of these are
optional for local development except `DATABASE_URL`, which is already set.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma connection string. Defaults to a local SQLite file (`file:./dev.db`). |
| `STRIPE_SECRET_KEY` | Stripe **test mode** secret key (`sk_test_...`). Enables real Checkout sessions for the dispatch fee. |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for `/api/stripe/webhook` (from `stripe listen`, see below). Required for bookings to move from "pending payment" to "confirmed" when using real Stripe. |
| `RESEND_API_KEY` | Enables real booking-notification emails via Resend. |
| `NOTIFY_EMAIL` | Where booking notifications are sent. Defaults to the business email in `site-config.ts`. |
| `NOTIFY_FROM_EMAIL` | Verified "from" address in Resend. |
| `ADMIN_PASSWORD` | Password for `/admin`. **Change this before deploying anywhere public.** |

### Testing Stripe Checkout locally

1. Add your test-mode `STRIPE_SECRET_KEY` to `.env`.
2. Install the [Stripe CLI](https://docs.stripe.com/stripe-cli), then run:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Copy the `whsec_...` value it prints into `STRIPE_WEBHOOK_SECRET` in `.env` and restart `npm run dev`.
4. Book a repair and pay with a [Stripe test card](https://docs.stripe.com/testing) (e.g. `4242 4242 4242 4242`, any future expiry/CVC).

Without step 2–3, Checkout sessions are created and payment succeeds, but
the job request stays `pending_payment` in the database since the webhook
never confirms it — the CLI (or a real webhook endpoint in production) is
what marks it `confirmed`/`paid`.

### Admin access

Visit `/admin` and sign in with `ADMIN_PASSWORD`. This is intentionally
minimal for v1 (a single shared password, no roles) — see
`src/lib/admin-auth.ts` and `src/proxy.ts` for the (small) implementation.
Replace with real auth before this holds real customer data.

## Database

Prisma + SQLite locally (`prisma/schema.prisma`, `prisma/migrations/`).

```bash
npx prisma migrate dev --name <change>   # create/apply a migration
npx prisma studio                        # browse the data
```

SQLite has no native enum support, so status/tier/timing fields are plain
strings — see `src/lib/types.ts` for the valid values.

## Deploying to Vercel

1. **Swap SQLite for hosted Postgres.** Vercel's filesystem is read-only/
   ephemeral, so the local SQLite file won't persist. Create a Postgres
   database (Vercel Postgres, [Supabase](https://supabase.com), or
   [Neon](https://neon.tech) all work), then:
   - Change `datasource db { provider = "sqlite" }` to `provider = "postgresql"` in `prisma/schema.prisma`.
   - Swap the `@prisma/adapter-better-sqlite3` adapter in `src/lib/prisma.ts` for `@prisma/adapter-pg` (`npm install @prisma/adapter-pg pg`), following the pattern in `.agents/skills/prisma-database-setup/references/postgresql.md`.
   - Set `DATABASE_URL` in Vercel's project settings to the new connection string.
   - Run `npx prisma migrate deploy` against the new database.
2. **Move photo uploads off the local filesystem.** `/api/book` currently
   saves uploaded photos to `public/uploads/`, which doesn't persist on
   Vercel. Swap `savePhoto()` in `src/app/api/book/route.ts` for
   [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) or S3 before
   relying on photo uploads in production.
3. Set the environment variables above in the Vercel project settings
   (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
   `ADMIN_PASSWORD`, etc.) — use **live** Stripe keys only once you've
   tested the full flow in test mode.
4. Point your Stripe webhook (Dashboard → Developers → Webhooks) at
   `https://<your-domain>/api/stripe/webhook`, subscribed to
   `checkout.session.completed`.
5. `vercel deploy` (or connect the repo in the Vercel dashboard). No other
   config is needed — this is a standard Next.js App Router project.

## Before real launch — outstanding placeholders

Search the repo for `[PLACEHOLDER]` and `TODO:` — the main ones:

- Real business name, legal entity, phone, email (`src/lib/site-config.ts`)
- Real dispatch fees and repair price ranges (`src/lib/pricing.ts`)
- Insurance/liability/legal copy (`src/lib/site-config.ts`, About/footer)
- Hero photo, service-area map graphic, testimonials, certifications (Home page)
- Membership plan pricing and real subscription billing (Membership page currently just collects a waitlist email)
- Admin auth hardening (`src/lib/admin-auth.ts`) and photo-upload storage (see Deploying above) before handling real customer data

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Prisma 7](https://www.prisma.io) + SQLite (dev) via `@prisma/adapter-better-sqlite3`
- [Stripe](https://stripe.com) Checkout for the dispatch-fee payment
- [Resend](https://resend.com) for email notifications
- [Zod](https://zod.dev) for booking form validation
