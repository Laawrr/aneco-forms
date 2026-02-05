import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET ?? "");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = req.cookies.get("access_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin", req.url));

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    // on invalid/expired token, redirect to sign-in
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
