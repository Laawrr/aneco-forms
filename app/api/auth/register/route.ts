import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password, first_name, last_name, admin } = await req.json();
  if (!username || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) return NextResponse.json({ error: "Username exists" }, { status: 400 });

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  const hashed = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: { username, password: hashed, first_name, last_name, admin: Boolean(admin) },
  });

  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username } }, { status: 201 });
}
