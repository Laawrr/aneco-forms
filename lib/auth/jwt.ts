import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

const ACCESS_EXPIRES = process.env.JWT_ACCESS_TOKEN_EXPIRES || "15m";
const ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
if (!ACCESS_SECRET) throw new Error("Missing JWT_ACCESS_TOKEN_SECRET in env");

const encoder = new TextEncoder();
const accessSecretKey = encoder.encode(ACCESS_SECRET);

export async function signAccessToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_EXPIRES)
    .sign(accessSecretKey);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecretKey);
  return payload as Record<string, unknown>;
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
