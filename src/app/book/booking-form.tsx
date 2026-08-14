"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { repairs, dispatchFees, formatCents } from "@/lib/pricing";
import type { IssueTypeId, PreferredTime } from "@/lib/types";
import { IconCamera, IconChevronDown } from "@/components/icons";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  issueType: IssueTypeId;
  issueDetails: string;
  preferredTime: PreferredTime;
  scheduledFor: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  issueType: "flat_tire",
  issueDetails: "",
  preferredTime: "asap",
  scheduledFor: "",
};

export function BookingForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = form.preferredTime === "asap" ? "emergency" : "scheduled";
  const fee = dispatchFees[tier];
  const selectedRepair = repairs.find((r) => r.id === form.issueType);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const body = new FormData();
      body.set("name", form.name);
      body.set("phone", form.phone);
      body.set("email", form.email);
      body.set("address", form.address);
      body.set("issueType", form.issueType);
      body.set("issueDetails", form.issueDetails);
      body.set("preferredTime", form.preferredTime);
      body.set("scheduledFor", form.scheduledFor);
      if (photo) body.set("photo", photo);

      const res = await fetch("/api/book", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      router.push(`/book/confirmation?job=${data.jobId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Contact info */}
      <fieldset className="space-y-5">
        <legend className="eyebrow mb-1 text-ink-faint">Your info</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name">
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="field-input"
              placeholder="Jordan Lee"
            />
          </Field>
          <Field label="Phone number" htmlFor="phone">
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="field-input"
              placeholder="(416) 555-0123"
            />
          </Field>
        </div>
        <Field label="Email (optional)" htmlFor="email">
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Where should we come?" htmlFor="address">
          <input
            id="address"
            required
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="field-input"
            placeholder="Street address, city — e.g. 123 King St W, Toronto"
          />
        </Field>
      </fieldset>

      {/* Issue */}
      <fieldset className="space-y-5">
        <legend className="eyebrow mb-1 text-ink-faint">
          What&apos;s wrong?
        </legend>
        <Field label="Issue" htmlFor="issueType">
          <div className="relative">
            <select
              id="issueType"
              value={form.issueType}
              onChange={(e) =>
                update("issueType", e.target.value as IssueTypeId)
              }
              className="field-input appearance-none pr-8"
            >
              {repairs.map((r) => (
                <option key={r.id} value={r.id} className="bg-charcoal">
                  {r.name}
                </option>
              ))}
            </select>
            <IconChevronDown
              size={16}
              className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-ink-faint"
            />
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Typical price: {selectedRepair?.priceRangeLabel}
          </p>
        </Field>
        <Field
          label="Anything else we should know? (optional)"
          htmlFor="issueDetails"
        >
          <textarea
            id="issueDetails"
            value={form.issueDetails}
            onChange={(e) => update("issueDetails", e.target.value)}
            className="field-input field-input--box min-h-24 resize-y"
            placeholder="e.g. rear brake barely stops the bike, started yesterday"
          />
        </Field>
        <Field label="Photo of the issue (optional)" htmlFor="photo">
          <label
            htmlFor="photo"
            className="group flex cursor-pointer items-center gap-4 border border-dashed border-white/20 px-5 py-4 transition-colors duration-300 hover:border-accent-green"
          >
            <IconCamera
              size={20}
              className="shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent-green"
            />
            <span className="text-sm text-ink-muted">
              {photo ? photo.name : "Add a photo"}
            </span>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="sr-only"
            />
          </label>
          {photoPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoPreview}
              alt="Uploaded issue preview"
              className="mt-3 h-28 w-28 border border-white/10 object-cover"
            />
          )}
        </Field>
      </fieldset>

      {/* Timing */}
      <fieldset className="space-y-5">
        <legend className="eyebrow mb-1 text-ink-faint">
          When do you need us?
        </legend>
        <div className="border-t border-white/10">
          <TierOption
            selected={form.preferredTime === "asap"}
            onClick={() => update("preferredTime", "asap")}
            title="ASAP"
            subtitle={`Emergency roadside — arrival in ${dispatchFees.emergency.responseTime}`}
            price={formatCents(dispatchFees.emergency.priceCents)}
          />
          <TierOption
            selected={form.preferredTime === "scheduled"}
            onClick={() => update("preferredTime", "scheduled")}
            title="Scheduled"
            subtitle={dispatchFees.scheduled.responseTime}
            price={formatCents(dispatchFees.scheduled.priceCents)}
          />
        </div>
        {form.preferredTime === "scheduled" && (
          <Field label="Preferred date & time" htmlFor="scheduledFor">
            <input
              id="scheduledFor"
              type="datetime-local"
              required
              value={form.scheduledFor}
              onChange={(e) => update("scheduledFor", e.target.value)}
              className="field-input"
            />
          </Field>
        )}
      </fieldset>

      {/* Summary */}
      <div className="border-t border-b border-white/10 py-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-ink-muted">
            {fee.label} dispatch fee (due now)
          </span>
          <span className="font-display text-2xl text-ink">
            {formatCents(fee.priceCents)}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-faint">
          Covers the mechanic&apos;s trip and first 15 minutes of
          diagnosis/labor. Any parts or additional labor are quoted on-site
          before further work begins.
        </p>
      </div>

      {error && (
        <p className="border-l-2 border-red-500 pl-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary-on-dark w-full justify-center disabled:opacity-50"
      >
        {submitting
          ? "Submitting…"
          : `Continue to Payment — ${formatCents(fee.priceCents)} due now`}
      </button>

      <style jsx global>{`
        .field-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid color-mix(in oklab, var(--color-ink) 15%, transparent);
          border-radius: 0;
          padding: 0.75rem 0.125rem;
          font-size: 0.9375rem;
          color: var(--color-ink);
          transition: border-color var(--duration-fast) var(--ease-premium);
        }
        .field-input--box {
          border: 1px solid color-mix(in oklab, var(--color-ink) 15%, transparent);
          padding: 0.75rem;
        }
        .field-input::placeholder {
          color: var(--color-ink-faint);
        }
        .field-input:focus {
          outline: none;
          border-color: var(--color-accent-green);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

function TierOption({
  selected,
  onClick,
  title,
  subtitle,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  price: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 border-b border-white/10 py-5 text-left transition-colors duration-300"
    >
      <span className="flex items-center gap-4">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            selected ? "border-accent-green" : "border-white/25"
          }`}
        >
          {selected && (
            <span className="h-2 w-2 rounded-full bg-accent-green" />
          )}
        </span>
        <span>
          <span
            className={`block font-medium transition-colors duration-300 ${
              selected ? "text-ink" : "text-ink-muted"
            }`}
          >
            {title}
          </span>
          <span className="mt-0.5 block text-xs text-ink-faint">
            {subtitle}
          </span>
        </span>
      </span>
      <span
        className={`shrink-0 text-sm font-medium transition-colors duration-300 ${
          selected ? "text-ink" : "text-ink-faint"
        }`}
      >
        {price}
      </span>
    </button>
  );
}
