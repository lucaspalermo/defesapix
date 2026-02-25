import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Shield, LayoutDashboard, FolderOpen, FileText, User, Settings } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SignOutButton } from '@/components/layout/Header';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: '/dashboard'  },
  { icon: FolderOpen,      label: 'Meus Casos', href: '/meus-casos' },
  { icon: FileText,        label: 'Documentos', href: '/documentos' },
  { icon: Settings,        label: 'Admin',      href: '/admin'      },
];

const PLAN_LABELS: Record<string, string> = {
  FREE: 'Plano Gratuito',
  BASIC: 'Plano Básico',
  PRO: 'Plano Pro',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { name: true, plan: true },
  });

  const userName = user?.name || session.user.name || 'Usuário';
  const userPlan = PLAN_LABELS[user?.plan ?? 'FREE'] ?? 'Plano Gratuito';
  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 border-r border-white/10 flex flex-col fixed top-0 bottom-0 hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-gradient flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block leading-none">Central de</span>
              <span className="font-bold text-green-500 text-sm block leading-none">Defesa Digital</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-white/40">{userPlan}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
