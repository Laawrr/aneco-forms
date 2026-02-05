import { cookies } from "next/headers";

export async function setAccessCookie(token: string, maxAgeSeconds = 60 * 15) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
  });
}

export async function setRefreshCookie(token: string, days = 30) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "refresh_token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: days * 24 * 60 * 60,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
