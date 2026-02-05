// proxy.ts (project root)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET ?? "");

// Simple cookie parsing helper
function parseCookie(cookieHeader: string, name: string) {
  const re = new RegExp(`(?:^|; )${name}=([^;]+)`);
  const m = cookieHeader.match(re);
  return m?.[1];
}

export default async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow public admin pages (login/register) without auth to avoid redirect loops
  const publicPaths = ["/admin", "/admin/", "/admin/register"];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // read cookie header and extract access_token value
  const cookieHeader = req.headers.get("cookie") || "";
  const token = parseCookie(cookieHeader, "access_token");

  if (!token) return NextResponse.redirect(new URL("/admin", req.url));

  try {
    const { payload } = await jwtVerify(token, secret) as any;
    // require admin flag in token payload — fallback to DB check if missing
    const isAdmin = payload?.admin === true || payload?.admin === "true";
    if (!isAdmin) {
      const userId = Number(payload.sub);
      if (!userId) return NextResponse.redirect(new URL("/admin", req.url));
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.admin) return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  } catch (err) {
    // token invalid/expired — redirect to login
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };