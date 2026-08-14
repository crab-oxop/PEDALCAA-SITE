import { z } from "zod";

const issueTypeIds = [
  "flat_tire",
  "brake_issue",
  "dropped_chain",
  "gear_shifting",
  "tune_up",
  "ebike_diagnostics",
  "wheel_issue",
  "other",
] as const;

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    phone: z.string().trim().min(7, "Enter a valid phone number"),
    email: z
      .union([z.string().trim().email("Enter a valid email"), z.literal("")])
      .optional(),
    address: z.string().trim().min(5, "Enter the address we should come to"),
    issueType: z.enum(issueTypeIds),
    issueDetails: z.string().trim().max(1000).optional(),
    preferredTime: z.enum(["asap", "scheduled"]),
    scheduledFor: z.string().trim().optional(),
  })
  .refine(
    (data) => data.preferredTime === "asap" || !!data.scheduledFor,
    {
      message: "Pick a date and time for your scheduled repair",
      path: ["scheduledFor"],
    }
  );

export type BookingInput = z.infer<typeof bookingSchema>;
