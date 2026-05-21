'use client';

import { ReactNode } from 'react';
import { Exo_2 } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';

const exo2 = Exo_2({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'User Management', icon: Users, href: '/admin/users' },
    { label: 'Moderation', icon: ShieldAlert, href: '/admin/moderation' },
    { label: 'Real-time Logs', icon: MessageSquare, href: '/admin/logs' },
  ];

  return (
    <div className={`${exo2.className} min-h-screen bg-[#0D1B2A] text-white flex`}>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-[#0D1B2A]/50 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0EA5A5] to-[#FF7A00] flex items-center justify-center">
              <span className="text-white font-black italic text-xs">P</span>
            </div>
            <span className="font-extrabold tracking-tighter text-xl italic uppercase">
              PARA<span className="text-[#FF7A00]">PAIR</span>
              <span className="ml-2 text-[10px] bg-[#0EA5A5] px-1.5 py-0.5 rounded italic lowercase tracking-normal">admin</span>
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-[#0EA5A5] text-white shadow-lg shadow-[#0EA5A5]/20' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-[#0EA5A5]'} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <button className="flex items-center gap-3 text-white/40 hover:text-[#FF7A00] transition-colors w-full px-4">
            <LogOut size={20} />
            <span className="text-sm font-bold italic">Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden p-4 border-b border-white/5 flex justify-between items-center bg-[#0D1B2A]">
          <Menu className="text-[#0EA5A5]" />
          <span className="font-black italic uppercase text-sm">ParaPair Admin</span>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
        </header>
        
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}