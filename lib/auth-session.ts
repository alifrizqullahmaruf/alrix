import { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get("admin_session")?.value;
  return Boolean(session) && session === process.env.ADMIN_SESSION_SECRET;
}
