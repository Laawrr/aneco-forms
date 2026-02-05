import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("access_token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const payload = await verifyAccessToken(token);
    const userId = Number(payload.sub);
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, admin: true, first_name: true, last_name: true } });
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
