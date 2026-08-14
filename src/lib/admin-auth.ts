// Minimal password gate for the /admin job-requests view.
// TODO: replace with real auth (e.g. NextAuth) before handling real customer data.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) instead of Node's
// built-in `crypto` module, because this file is imported from
// src/middleware.ts, which runs on the Edge runtime — Edge does not support
// Node's `crypto` module, only Web Crypto.
export const ADMIN_COOKIE_NAME = "pedalcaa_admin";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(password);
}

export async function tokenForPassword(password: string): Promise<string> {
  return sha256Hex(password);
}

export async function isValidAdminToken(
  token: string | undefined | null
): Promise<boolean> {
  const expected = await expectedToken();
  if (!expected || !token) return false;
  return token === expected;
}
