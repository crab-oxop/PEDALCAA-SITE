import type { IssueTypeId, ServiceTier } from "@/lib/types";

// TODO: [PLACEHOLDER] All figures below are illustrative. Confirm real
// dispatch fees and repair price ranges before launch.
//
// Pricing model: customers pay a flat "dispatch fee" at booking time (like a
// tow truck call-out fee), covering the mechanic's trip + first 15 minutes of
// diagnosis/labor. The actual repair cost depends on what's wrong and is
// quoted on-site by the mechanic before any further work begins.

export const dispatchFees: Record<
  ServiceTier,
  {
    label: string;
    priceCents: number;
    responseTime: string;
    description: string;
  }
> = {
  emergency: {
    label: "Emergency Roadside",
    priceCents: 5900,
    responseTime: "30–60 min",
    description:
      "Stuck on the road or trail right now. We dispatch the nearest available mechanic ASAP.",
  },
  scheduled: {
    label: "Scheduled Repair",
    priceCents: 3500,
    responseTime: "Next available 2-hour window",
    description:
      "Not urgent. Pick a day and time window that works for you — driveway, office, wherever.",
  },
};

export const repairs: {
  id: IssueTypeId;
  name: string;
  priceRangeLabel: string;
  description: string;
}[] = [
  {
    id: "flat_tire",
    name: "Flat Tire Repair / Replacement",
    priceRangeLabel: "$25–45 + tube/tire if needed",
    description: "Patch or replace a punctured tube or tire, front or rear.",
  },
  {
    id: "brake_issue",
    name: "Brake Adjustment / Pad Replacement",
    priceRangeLabel: "$20–50 + pads if needed",
    description: "Squeaky, rubbing, or weak brakes — rim or disc.",
  },
  {
    id: "dropped_chain",
    name: "Chain / Derailleur Fix",
    priceRangeLabel: "$25–60 + parts if needed",
    description: "Dropped chain, bent derailleur hanger, or skipping gears.",
  },
  {
    id: "gear_shifting",
    name: "Gear & Shifting Adjustment",
    priceRangeLabel: "$20–35",
    description: "Indexing tune so gears shift crisply front and rear.",
  },
  {
    id: "tune_up",
    name: "Full Tune-Up",
    priceRangeLabel: "$70–120",
    description:
      "Brakes, gears, chain lube, bolt check, and safety inspection — the works.",
  },
  {
    id: "ebike_diagnostics",
    name: "E-Bike Diagnostics",
    priceRangeLabel: "$40–80 diagnostic fee",
    description:
      "Motor, battery, or display issue. Diagnostic fee applies; repair quoted after.",
  },
  {
    id: "wheel_issue",
    name: "Wheel Truing / Spoke Repair",
    priceRangeLabel: "$25–45 + spokes if needed",
    description: "Wobbly or out-of-true wheel, broken spoke.",
  },
  {
    id: "other",
    name: "Something Else",
    priceRangeLabel: "Quoted on-site",
    description: "Not sure what's wrong? Tell us and we'll take a look.",
  },
];

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Looks up the human-readable label for a stored issue-type/repair-type id
// (e.g. from JobRequest.issueType or Review.repairType). Both are stored as
// plain strings, so this also tolerates unrecognized/legacy values.
export function repairName(id: string | null | undefined): string | undefined {
  return repairs.find((r) => r.id === id)?.name;
}
