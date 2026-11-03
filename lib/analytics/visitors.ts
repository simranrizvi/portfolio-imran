import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const VISITOR_COOKIE = "portfolio_visitor_id";

export async function getVisitorId() {
  const cookieStore = await cookies();

  const existing = cookieStore.get(VISITOR_COOKIE);

  if (existing?.value) {
    return existing.value;
  }

  const visitorId = randomUUID();

  cookieStore.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return visitorId;
}
