import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const isProtected = req.nextUrl.pathname.startsWith("/admin/dashboard");

  if (isProtected && session !== process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
