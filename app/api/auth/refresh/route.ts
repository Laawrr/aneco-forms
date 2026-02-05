import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashToken, generateRefreshToken, signAccessToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token")?.value;
  if (!refresh) return NextResponse.json({ error: "No refresh" }, { status: 401 });

  const tokenHash = hashToken(refresh);
  const tokenRec = await prisma.refresh_token.findUnique({ where: { tokenHash } });
  if (!tokenRec) return NextResponse.json({ error: "Invalid refresh" }, { status: 401 });
  if (tokenRec.revoked) return NextResponse.json({ error: "Revoked" }, { status: 401 });
  if (tokenRec.expiresAt < new Date()) return NextResponse.json({ error: "Expired" }, { status: 401 });

  // Rotate
  const newRefresh = generateRefreshToken();
  const newHash = hashToken(newRefresh);
  const expiresDays = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30);
  const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000);

  await prisma.refresh_token.update({ where: { id: tokenRec.id }, data: { tokenHash: newHash, expiresAt } });

  const accessToken = await signAccessToken({ sub: tokenRec.userId });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("access_token", accessToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
  });
  res.cookies.set("refresh_token", newRefresh, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresDays * 24 * 60 * 60,
  });

  return res;
}
