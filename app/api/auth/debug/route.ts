import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth/jwt';

export async function GET() {
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'Not available in production' }, { status: 403 });

  const cookieStore = await cookies();
  const access = cookieStore.get('access_token')?.value;
  const refresh = cookieStore.get('refresh_token')?.value;

  let payload = null;
  try {
    if (access) payload = await verifyAccessToken(access);
  } catch (err) {
    payload = { error: 'invalid_or_expired' };
  }

  return NextResponse.json({ access: !!access, refresh: !!refresh, payload });
}