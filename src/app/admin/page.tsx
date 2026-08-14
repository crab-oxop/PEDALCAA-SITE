import type { Metadata } from "next";
import { Container } from "@/components/container";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Job Requests — Admin",
};

// Always fetch fresh data — this is a live dashboard, not a static page.
export const dynamic = "force-dynamic";

const statusDot: Record<string, string> = {
  pending_payment: "bg-amber-400",
  confirmed: "bg-accent-green",
  dispatched: "bg-sky-400",
  completed: "bg-ink-faint",
  cancelled: "bg-red-500",
};

export default async function AdminPage() {
  const jobs = await prisma.jobRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <section className="bg-void pt-32 pb-24">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <h1 className="font-display text-3xl text-ink">Job Requests</h1>
            <p className="mt-2 text-sm text-ink-faint">
              {jobs.length} request{jobs.length === 1 ? "" : "s"}. Minimal v1
              view — no filtering or pagination yet.
            </p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="btn btn-ghost text-ink">
              Log out
            </button>
          </form>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-ink-faint">
                <th className="py-3 pr-4 font-medium">Received</th>
                <th className="py-3 pr-4 font-medium">Customer</th>
                <th className="py-3 pr-4 font-medium">Issue</th>
                <th className="py-3 pr-4 font-medium">Timing</th>
                <th className="py-3 pr-4 font-medium">Tier / Fee</th>
                <th className="py-3 pr-4 font-medium">Payment</th>
                <th className="py-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 whitespace-nowrap text-ink-faint">
                    {job.createdAt.toLocaleString()}
                  </td>
                  <td className="py-4 pr-4">
                    <div className="font-medium text-ink">{job.name}</div>
                    <div className="text-ink-faint">{job.phone}</div>
                    <div className="text-ink-faint">{job.address}</div>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="text-ink-muted">{job.issueType}</div>
                    {job.issueDetails && (
                      <div className="mt-1 max-w-xs text-ink-faint">
                        {job.issueDetails}
                      </div>
                    )}
                    {job.photoUrl && (
                      <a
                        href={job.photoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline mt-1 inline-block text-accent-green"
                      >
                        View photo
                      </a>
                    )}
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap text-ink-muted">
                    {job.preferredTime === "asap"
                      ? "ASAP"
                      : (job.scheduledFor?.toLocaleString() ?? "Scheduled")}
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap text-ink-muted">
                    {job.serviceTier} <br />
                    {formatCents(job.dispatchFeeCents)}
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap text-ink-muted">
                    {job.stripePaymentStatus ?? "—"}
                  </td>
                  <td className="py-4 pr-4">
                    <span className="flex items-center gap-2 whitespace-nowrap text-ink-muted">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          statusDot[job.status] ?? "bg-ink-faint"
                        }`}
                      />
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-faint">
                    No job requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
