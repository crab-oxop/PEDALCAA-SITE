import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { StarRating } from "@/components/star-rating";
import { ReviewForm } from "@/components/review-form";
import { prisma } from "@/lib/prisma";
import { repairName } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Reviews — ${siteConfig.businessName}`,
  description: "What riders are saying about PedalCAA mobile bike repair.",
};

// Always fetch fresh data — new reviews should show up immediately.
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { hidden: false },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <section className="bg-void pt-40 pb-24 sm:pt-48">
      <Container>
        <Reveal>
          <p className="eyebrow text-ink-muted">Reviews</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 text-display-lg font-display text-ink">
            What riders say.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          {count > 0 ? (
            <div className="mt-6 flex items-center gap-3">
              <StarRating rating={average} size={20} />
              <span className="text-sm text-ink-muted">
                {average.toFixed(1)} average · {count} review
                {count === 1 ? "" : "s"}
              </span>
            </div>
          ) : (
            <p className="mt-6 text-sm text-ink-faint">
              No reviews yet — be the first.
            </p>
          )}
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal delay={200}>
            <ReviewForm />
          </Reveal>

          <div className="border-t border-white/10 lg:border-t-0">
            {reviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 40}>
                <div className="border-b border-white/10 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-ink">{review.name}</span>
                    <span className="text-xs text-ink-faint">
                      {review.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <StarRating rating={review.rating} size={14} />
                    {repairName(review.repairType) && (
                      <span className="rounded-sm border border-white/15 px-2.5 py-1 text-xs font-medium tracking-wide text-ink-muted">
                        {repairName(review.repairType)}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {review.comment}
                  </p>
                </div>
              </Reveal>
            ))}
            {reviews.length === 0 && (
              <p className="py-10 text-center text-sm text-ink-faint">
                No reviews yet.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
