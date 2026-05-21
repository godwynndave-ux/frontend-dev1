'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Exo_2 } from 'next/font/google';
import { Eye, EyeOff, User, Lock, ShieldCheck } from 'lucide-react';

// Initialize Exo 2 to match the logo
const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-8`}>
      <div className="w-full max-w-6xl bg-white overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] grid lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative bg-[#0EA5A5] overflow-hidden">
          <div className="absolute top-0 right-[-120px] w-[240px] h-full bg-white rounded-l-[120px]" />

          <div className="relative z-10 flex flex-col justify-between p-16 text-white max-w-[480px]">
            <div>
              {/* Brand Logo Interlocked Style */}
              <div className="flex items-center gap-3 mb-12">
                <div className="flex -space-x-1.5 font-bold">
                  <div className="w-9 h-9 rounded-xl border-2 border-white flex items-center justify-center text-sm">P</div>
                  <div className="w-9 h-9 rounded-xl border-2 border-[#FF7A00] bg-[#FF7A00] flex items-center justify-center text-sm">P</div>
                </div>
                <div className="h-6 w-[1px] bg-white/30 mx-2" />
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase">StackForge</span>
              </div>

              {/* LOGO MATCH: Exo 2 Extra Bold + Tighter Tracking */}
              <h1 className="text-[76px] font-[800] leading-none tracking-tighter mb-8 italic">
                <span className="text-white">PARA</span>
                <span className="text-[#FF7A00]">PAIR</span>
              </h1>

              <p className="text-xl leading-relaxed text-white/90 font-medium tracking-tight">
                Helping professionals create meaningful
                and trusted connections through opportunity.
              </p>
            </div>

            <div className="flex gap-6 text-[11px] uppercase tracking-[0.3em] text-white/60 font-black">
              <span>Trusted</span>
              <span>Professional</span>
              <span>Connected</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white flex flex-col items-center justify-center px-6 py-12 lg:px-16 text-[#0D1B2A]">
          <div className="w-full max-w-[400px]">

            {/* MOBILE LOGO */}
            <div className="lg:hidden text-center mb-10">
              <h1 className="text-[46px] font-[800] tracking-tighter italic">
                <span className="text-[#0EA5A5]">PARA</span>
                <span className="text-[#FF7A00]">PAIR</span>
              </h1>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-[44px] font-bold tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 mt-2 font-medium">Sign in to your professional portal</p>
            </div>

            {/* FORM CARD */}
            <div className="bg-white rounded-[32px] border border-[#E7EEF3] shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-8 sm:p-10">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                {/* USERNAME FIELD */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-slate-500">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-[15px] font-medium outline-none focus:border-[#0EA5A5] focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* PASSWORD FIELD */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-slate-500">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-12 text-[15px] font-medium outline-none focus:border-[#0EA5A5] focus:bg-white transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0EA5A5]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link href="/forgot-password" className="text-[11px] font-bold text-[#0EA5A5] uppercase tracking-tighter hover:underline">Forgot password?</Link>
                  </div>
                </div>

                <button className="w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-base font-bold shadow-lg shadow-[#FF7A00]/20 transition-all active:scale-[0.98]">
                  Sign In
                </button>

                <div className="pt-2 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest opacity-40">
                    <ShieldCheck size={14} className="text-[#0EA5A5]" /> Secure login
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-semibold tracking-tight">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#FF7A00] font-black hover:underline transition-all uppercase tracking-tighter">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}