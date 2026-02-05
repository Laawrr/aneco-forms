import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAccessToken, generateRefreshToken, hashToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const accessToken = await signAccessToken({ sub: user.id, username: user.username, admin: user.admin });

  // Refresh token (opaque) — store only hashed form in DB
  const refreshToken = generateRefreshToken();
  const tokenHash = hashToken(refreshToken);
  const expiresDays = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30);
  const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000);

  await prisma.refresh_token.create({ data: { tokenHash, userId: user.id, expiresAt } });

  const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username } });
  // set httpOnly cookies on the response
  res.cookies.set("access_token", accessToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15, // 15 minutes
  });
  res.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresDays * 24 * 60 * 60,
  });

  return res;
}
