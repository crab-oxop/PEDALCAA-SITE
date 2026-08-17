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

export const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(80, "Keep your name under 80 characters"),
  rating: z
    .number()
    .int("Pick a rating")
    .min(1, "Pick a rating")
    .max(5, "Pick a rating"),
  comment: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(600, "Keep your review under 600 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
