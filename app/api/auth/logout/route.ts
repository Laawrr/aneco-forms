import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token")?.value;
  if (refresh) {
    const tokenHash = hashToken(refresh);
    await prisma.refresh_token.deleteMany({ where: { tokenHash } });
  }

  const res = NextResponse.json({ ok: true });
  // clear cookies
  res.cookies.set("access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  res.cookies.set("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
