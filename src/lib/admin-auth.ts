import { createHash } from "crypto";

// Minimal password gate for the /admin job-requests view.
// TODO: replace with real auth (e.g. NextAuth) before handling real customer data.
export const ADMIN_COOKIE_NAME = "pedalcaa_admin";

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function tokenForPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function isValidAdminToken(token: string | undefined | null): boolean {
  const expected = expectedToken();
  if (!expected || !token) return false;
  return token === expected;
}
