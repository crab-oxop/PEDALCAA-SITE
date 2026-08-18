"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChevronDown, IconStar } from "@/components/icons";
import { repairs } from "@/lib/pricing";
import type { IssueTypeId } from "@/lib/types";

type FieldErrors = Partial<
  Record<"name" | "rating" | "comment" | "repairType", string>
>;

export function ReviewForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [repairType, setRepairType] = useState<IssueTypeId | "">("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real users never see this
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment, repairType, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({
          name: data.fieldErrors?.name?.[0],
          rating: data.fieldErrors?.rating?.[0],
          comment: data.fieldErrors?.comment?.[0],
          repairType: data.fieldErrors?.repairType?.[0],
        });
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setName("");
      setRating(0);
      setRepairType("");
      setComment("");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="lg:sticky lg:top-32">
        <p className="eyebrow text-accent-green">Thank you</p>
        <p className="mt-5 text-lg text-ink">
          Your review is live — thanks for taking the time.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="link-underline mt-6 text-sm text-ink-muted"
        >
          Leave another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:sticky lg:top-32">
      <p className="eyebrow text-ink-faint">Leave a review</p>

      {/* Honeypot: visually hidden off-canvas, not display:none — bots that
          skip display:none/visibility:hidden fields still fill this one. */}
      <div
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
        aria-hidden="true"
      >
        <label htmlFor="review-website">Website</label>
        <input
          id="review-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <StarPicker value={rating} onChange={setRating} error={errors.rating} />

      <Field label="Name" htmlFor="review-name" error={errors.name}>
        <input
          id="review-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field-input"
          placeholder="Jordan Lee"
          aria-describedby={errors.name ? "review-name-error" : undefined}
        />
      </Field>

      <Field
        label="What was the repair?"
        htmlFor="review-repair-type"
        error={errors.repairType}
      >
        <div className="relative">
          <select
            id="review-repair-type"
            value={repairType}
            onChange={(e) =>
              setRepairType(e.target.value as IssueTypeId | "")
            }
            className="field-input appearance-none pr-8"
            aria-describedby={
              errors.repairType ? "review-repair-type-error" : undefined
            }
          >
            <option value="" className="bg-charcoal">
              General feedback / other
            </option>
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
      </Field>

      <Field label="Your review" htmlFor="review-comment" error={errors.comment}>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="field-input field-input--box min-h-28 resize-y"
          placeholder="How did it go?"
          aria-describedby={errors.comment ? "review-comment-error" : undefined}
        />
      </Field>

      {formError && (
        <p className="border-l-2 border-red-500 pl-4 text-sm text-red-400">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary-on-dark w-full justify-center disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit review"}
      </button>

      <style jsx global>{`
        .field-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid
            color-mix(in oklab, var(--color-ink) 15%, transparent);
          border-radius: 0;
          padding: 0.75rem 0.125rem;
          font-size: 0.9375rem;
          color: var(--color-ink);
          transition: border-color var(--duration-fast) var(--ease-premium);
        }
        .field-input--box {
          border: 1px solid
            color-mix(in oklab, var(--color-ink) 15%, transparent);
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

function StarPicker({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (n: number) => void;
  error?: string;
}) {
  return (
    <div>
      <span id="review-rating-label" className="mb-2 block text-sm text-ink-muted">
        Your rating
      </span>
      <div
        role="group"
        aria-labelledby="review-rating-label"
        aria-describedby={error ? "review-rating-error" : undefined}
        className="flex items-center gap-1"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => onChange(n)}
            className="p-1 text-accent-green transition-transform duration-300 hover:scale-110"
          >
            <IconStar size={26} filled={n <= value} />
          </button>
        ))}
      </div>
      {error && (
        <p id="review-rating-error" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm text-ink-muted">{label}</span>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </label>
  );
}
