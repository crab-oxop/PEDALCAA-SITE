// SQLite (via Prisma) has no native enum support, so these fields are stored
// as plain strings. These unions are the source of truth for valid values.

export type PreferredTime = "asap" | "scheduled";

export type ServiceTier = "emergency" | "scheduled";

export type JobStatus =
  | "pending_payment"
  | "confirmed"
  | "dispatched"
  | "completed"
  | "cancelled";

export type StripePaymentStatus = "unpaid" | "paid" | "failed";

export type IssueTypeId =
  | "flat_tire"
  | "brake_issue"
  | "dropped_chain"
  | "gear_shifting"
  | "tune_up"
  | "ebike_diagnostics"
  | "wheel_issue"
  | "other";
