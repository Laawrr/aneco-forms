import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return redirect('/admin');

  try {
    const payload = await verifyAccessToken(token);
    const isAdmin = payload?.admin === true || payload?.admin === 'true';
    if (!isAdmin) {
      // fallback: verify admin from database using sub
      const userId = Number(payload.sub);
      if (!userId) return redirect('/admin');
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.admin) return redirect('/admin');
    }
  } catch (err) {
    return redirect('/admin');
  }

  return <>{children}</>;
}
