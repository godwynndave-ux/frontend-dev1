'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Exo_2 } from 'next/font/google';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Sparkles,
  Calendar,
  AtSign,
  Send
} from 'lucide-react';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Password Strength Logic
  const strengthResult = useMemo(() => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const colors = ["bg-red-400", "bg-[#FF7A00]", "bg-yellow-400", "bg-[#0EA5A5]"];
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score - 1] || "", color: colors[score - 1] || "bg-slate-200" };
  }, [password]);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-8`}>
      <div className="w-full max-w-6xl bg-white overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] grid lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative bg-[#0EA5A5] overflow-hidden">
          <div className="absolute top-0 right-[-120px] w-[240px] h-full bg-white rounded-l-[120px]" />
          <div className="relative z-10 flex flex-col justify-between p-16 text-white max-w-[480px]">
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="flex -space-x-1.5 font-bold">
                  <div className="w-9 h-9 rounded-xl border-2 border-white flex items-center justify-center text-sm">P</div>
                  <div className="w-9 h-9 rounded-xl border-2 border-[#FF7A00] bg-[#FF7A00] flex items-center justify-center text-sm text-white">P</div>
                </div>
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase opacity-70">Registration</span>
              </div>
              <h1 className="text-[76px] font-[800] leading-none tracking-tighter mb-8">
                <span className="text-white">PARA</span>
                <span className="text-[#FF7A00]">PAIR</span>
              </h1>
              <p className="text-xl leading-relaxed text-white/90 font-medium tracking-tight italic">
                &rdquo;Building trusted professional connections through opportunity.&rdquo;
              </p>
            </div>
            <div className="flex gap-6 text-[11px] uppercase tracking-[0.3em] text-white/60 font-black">
              <span>Trusted</span><span>Professional</span><span>Connected</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white flex flex-col items-center justify-center px-6 py-10 lg:px-14 text-[#0D1B2A]">
          <div className="w-full max-w-[420px]">

            <div className="text-center mb-8">
              <h2 className="text-[42px] font-bold tracking-tight">Create Account</h2>
              <p className="text-slate-400 mt-1 font-medium text-sm italic">Join the PARAPair Network</p>
            </div>

            <div className="bg-white rounded-[32px] border border-[#E7EEF3] shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-8 sm:p-10">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                {/* NAME & USERNAME GRID */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                      <input type="text" placeholder="Kevin France" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-10 text-sm outline-none focus:border-[#0EA5A5] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Username</label>
                    <div className="relative group">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                      <input type="text" placeholder="kevinfrance" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-10 text-sm outline-none focus:border-[#0EA5A5] transition-all" />
                    </div>
                  </div>
                </div>

                {/* BIRTH DATE */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Birth Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                    <input type="date" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-sm outline-none focus:border-[#0EA5A5] transition-all" />
                  </div>
                </div>

                {/* EMAIL & SEND OTP */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">E-mail Address</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                      <input type="email" placeholder="kevin@email.com" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-sm outline-none focus:border-[#0EA5A5] transition-all" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-4 bg-[#0EA5A5] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0c8e8e] transition-all flex items-center gap-2"
                    >
                      {otpSent ? "Resend" : "OTP"} <Send size={12} />
                    </button>
                  </div>
                </div>

                {/* OTP INPUT (Conditional) */}
                {otpSent && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-[#0EA5A5]">Verification Code</label>
                    <input type="text" placeholder="0 0 0 0 0 0" className="w-full h-12 rounded-xl border border-[#0EA5A5]/30 bg-[#FAFAFA] text-center tracking-[0.5em] font-bold text-[#0EA5A5] outline-none focus:border-[#0EA5A5]" maxLength={6} />
                  </div>
                )}

                {/* PASSWORD */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest mb-2 ml-1 text-slate-500">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-12 text-sm outline-none focus:border-[#0EA5A5] transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0EA5A5]">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* STRENGTH METER */}
                  <div className="mt-2 px-1">
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className={`flex-1 rounded-full transition-all duration-500 ${step <= strengthResult.score ? strengthResult.color : "bg-slate-100"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* SHOW CONFIRM PASSWORD ONLY WHEN PASSWORD IS FILLED */}
                  {password.length > 8 && (
                    <div className="space-y-1">

                      {/* CONFIRM PASSWORD */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest mb-2 ml-1 text-slate-500">
                          Confirm Password
                        </label>

                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />

                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className={`w-full h-12 rounded-xl bg-[#FAFAFA] pl-12 pr-12 text-sm outline-none transition-all border ${
                              confirmPassword.length === 0
                                ? 'border-slate-200 focus:border-[#0EA5A5]'
                                : password === confirmPassword
                                ? 'border-green-500 focus:border-green-500'
                                : 'border-red-500 focus:border-red-500'
                            }`}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0EA5A5]"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        {/* PASSWORD MATCH INDICATOR */}
                        <div className="mt-2 px-1">
                          <div className="flex gap-1 h-1">
                            <div
                              className={`flex-1 rounded-full transition-all duration-500 ${
                                confirmPassword.length === 0
                                  ? 'bg-slate-100'
                                  : password === confirmPassword
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            />
                          </div>

                          <p
                            className={`mt-2 text-xs font-medium transition-all ${
                              confirmPassword.length === 0
                                ? 'text-slate-400'
                                : password === confirmPassword
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {confirmPassword.length === 0
                              ? 'Re-enter your password'
                              : password === confirmPassword
                              ? '✓ Passwords match'
                              : '✗ Passwords do not match'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* SUBMIT BUTTON */}
                <button className="w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-base font-bold shadow-lg shadow-[#FF7A00]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
                  <Sparkles size={18} /> Create Account
                </button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 font-semibold tracking-tight uppercase">
                Already member? <Link href="/login" className="text-[#0EA5A5] font-black hover:underline tracking-tighter ml-1">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}