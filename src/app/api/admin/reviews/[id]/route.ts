import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: this route does not check the admin cookie itself — src/middleware.ts
// gates all of /api/admin/:path* already (see its matcher). Don't assume
// this handler is unguarded just because there's no auth check below.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.review.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
