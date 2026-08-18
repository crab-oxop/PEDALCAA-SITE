"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StarRating } from "@/components/star-rating";
import { repairName } from "@/lib/pricing";

export function AdminReviewRow({
  review,
}: {
  review: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    repairType: string | null;
    createdAt: Date;
  };
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirm("Delete this review? This can't be undone.")) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/reviews/${review.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("Failed to delete. Try again.");
        setDeleting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Failed to delete. Try again.");
      setDeleting(false);
    }
  }

  return (
    <tr className="border-b border-white/10 align-top">
      <td className="py-4 pr-4 whitespace-nowrap text-ink-faint">
        {/* Fixed locale — this is a Client Component, so it hydrates;
            without a fixed locale, server (Node ICU default) and client
            (browser locale) can render different date strings. */}
        {review.createdAt.toLocaleString("en-CA")}
      </td>
      <td className="py-4 pr-4 font-medium text-ink">{review.name}</td>
      <td className="py-4 pr-4 whitespace-nowrap">
        <StarRating rating={review.rating} size={14} />
      </td>
      <td className="py-4 pr-4 whitespace-nowrap text-ink-muted">
        {repairName(review.repairType) ?? "—"}
      </td>
      <td className="py-4 pr-4 max-w-md text-ink-muted">{review.comment}</td>
      <td className="py-4 pr-4">
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm text-red-400 transition-colors duration-300 hover:text-red-300 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </td>
    </tr>
  );
}
