import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field (it's
  // positioned off-canvas). Bots that blindly fill every input do — accept
  // silently without writing anything so they don't learn it's a trap.
  const website = (body as Record<string, unknown>).website;
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid submission", fieldErrors },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      name: parsed.data.name,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      repairType: parsed.data.repairType || null,
    },
  });

  return NextResponse.json({ review });
}
