'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Exo_2 } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Eye, EyeOff, User, Mail, Lock, Sparkles, Calendar, AtSign, 
  Send, CheckCircle2, XCircle, AlertCircle, Briefcase, 
  ShoppingCart, ChevronRight, Check 
} from 'lucide-react';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// --- ONBOARDING DATA ---
const GOALS = {
  WORK: {
    id: 'work',
    label: 'Work / Sell',
    sub: 'Seeking opportunities & clients',
    color: '#0EA5A5',
    categories: ['Jobs', 'Freelance work', 'Internships', 'Collaborations', 'Clients']
  },
  HIRE: {
    id: 'hire',
    label: 'Hire / Buy',
    sub: 'Offering projects & services',
    color: '#FF7A00',
    categories: ['Technology', 'Engineering', 'Baking', 'Design', 'Marketing', 'Healthcare', 'Construction', 'Education', 'AI & Data Science', 'Finance', 'Legal Services', 'Creative Arts']
  }
};

export default function RegisterPage() {
  const router = useRouter();
  // State Machine for Steps
  const [step, setStep] = useState<'register' | 'goal' | 'categories'>('register');
  const [selectedGoal, setSelectedGoal] = useState<'work' | 'hire'>('work');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Logic Helpers
  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const strengthResult = useMemo(() => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const colors = ["text-red-500", "text-[#FF7A00]", "text-yellow-500", "text-[#0EA5A5]"];
    const barColors = ["bg-red-500", "bg-[#FF7A00]", "bg-yellow-500", "bg-[#0EA5A5]"];
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score - 1] || "Empty", color: colors[score - 1] || "text-slate-300", barColor: barColors[score - 1] || "bg-slate-100" };
  }, [password]);

  // Actions
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('goal'); // Move to Goal Selection
  };

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-8`}>
      <div className="w-full max-w-6xl bg-white overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] grid lg:grid-cols-2 min-h-[720px]">

        {/* LEFT PANEL (Branding Remains Constant) */}
        <div className="hidden lg:flex relative bg-[#0EA5A5] overflow-hidden">
          <div className="absolute top-0 right-[-120px] w-[240px] h-full bg-white rounded-l-[120px]" />
          <div className="relative z-10 flex flex-col justify-between p-16 text-white max-w-[480px]">
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="flex -space-x-1.5 font-bold">
                  <div className="w-9 h-9 rounded-xl border-2 border-white flex items-center justify-center text-sm">P</div>
                  <div className="w-9 h-9 rounded-xl border-2 border-[#FF7A00] bg-[#FF7A00] flex items-center justify-center text-sm text-white">P</div>
                </div>
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase opacity-70">
                  {step === 'register' ? 'Registration' : 'Onboarding'}
                </span>
              </div>
              <h1 className="text-[76px] font-[800] leading-none tracking-tighter mb-8 italic">
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

        {/* RIGHT PANEL (Dynamic Content) */}
        <div className="bg-white flex flex-col items-center justify-center px-6 py-10 lg:px-14 text-[#0D1B2A]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: REGISTER */}
            {step === 'register' && (
              <motion.div 
                key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-[420px]"
              >
                <div className="text-center mb-8">
                  <h2 className="text-[42px] font-bold tracking-tight">Create Account</h2>
                  <p className="text-slate-400 mt-1 font-medium text-sm italic">Join the PARAPair Network</p>
                </div>

                <div className="bg-white rounded-[32px] border border-[#E7EEF3] shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-8 sm:p-10">
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                          <input type="text" placeholder="Kevin France" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-10 text-sm outline-none focus:border-[#0EA5A5] transition-all font-medium" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Username</label>
                        <div className="relative group">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5] transition-colors" />
                          <input type="text" placeholder="kevinfrance" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-10 text-sm outline-none focus:border-[#0EA5A5] transition-all font-medium" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Birth Date</label>
                      <input type="date" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] px-4 text-sm outline-none focus:border-[#0EA5A5]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1 pr-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">E-mail</label>
                        {email.length > 0 && !isEmailValid && <span className="text-[9px] font-black text-red-500 uppercase flex items-center gap-1"><AlertCircle size={10} /> Invalid Format</span>}
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1 group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5]" />
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kevin@email.com" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-sm outline-none focus:border-[#0EA5A5] font-medium" />
                        </div>
                        <button type="button" disabled={!isEmailValid} onClick={() => setOtpSent(true)} className={`px-4 rounded-xl text-[10px] font-black uppercase transition-all ${isEmailValid ? 'bg-[#0EA5A5] text-white' : 'bg-slate-100 text-slate-400'}`}>OTP</button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 text-center">
                        <input type="text" placeholder="0 0 0 0 0 0" className="w-full h-12 rounded-xl border border-[#0EA5A5]/30 bg-[#FAFAFA] text-center tracking-[0.5em] font-bold text-[#0EA5A5] outline-none" maxLength={6} />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1 pr-1">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Password</label>
                        <span className={`text-[9px] font-black uppercase ${strengthResult.color}`}>{strengthResult.label}</span>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0EA5A5]" />
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] pl-12 pr-12 text-sm outline-none focus:border-[#0EA5A5] font-medium" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                      </div>
                      <div className="mt-2 px-1 flex gap-1 h-1">
                        {[1, 2, 3, 4].map((step) => <div key={step} className={`flex-1 rounded-full transition-all duration-500 ${step <= strengthResult.score ? strengthResult.barColor : "bg-slate-100"}`} />)}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Confirm Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 rounded-xl border border-slate-200 bg-[#FAFAFA] px-4 text-sm outline-none focus:border-[#0EA5A5]" />
                    </div>

                    <button className="w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-base font-bold shadow-lg shadow-[#FF7A00]/20 transition-all flex items-center justify-center gap-2 mt-4">
                      <Sparkles size={18} /> Create Account
                    </button>
                  </form>
                </div>
                <p className="mt-6 text-center text-sm text-slate-500 font-semibold tracking-tight uppercase">
                  Already member? <Link href="/login" className="text-[#0EA5A5] font-black hover:underline ml-1">Sign In</Link>
                </p>
              </motion.div>
            )}

            {/* STEP 2: GOAL SELECTION */}
            {step === 'goal' && (
              <motion.div 
                key="goal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-[420px] text-center"
              >
                <h2 className="text-[36px] font-bold mb-2">Set Your Purpose</h2>
                <p className="text-slate-500 mb-8 italic">How will you use the forge today?</p>
                <div className="grid gap-4">
                  {[GOALS.WORK, GOALS.HIRE].map((g) => (
                    <button
                      key={g.id} onClick={() => { setSelectedGoal(g.id as any); setStep('categories'); }}
                      className="group p-8 rounded-[32px] border-2 transition-all text-left bg-white hover:shadow-xl flex justify-between items-center"
                      style={{ borderColor: selectedGoal === g.id ? g.color : '#E7EEF3' }}
                    >
                      <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter" style={{ color: g.color }}>{g.label}</h3>
                        <p className="text-slate-400 text-sm font-medium">{g.sub}</p>
                      </div>
                      {g.id === 'work' ? <Briefcase size={32} className="text-[#0EA5A5]" /> : <ShoppingCart size={32} className="text-[#FF7A00]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: CATEGORIES */}
            {step === 'categories' && (
              <motion.div 
                key="categories" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-[460px]"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-bold">Select Categories</h2>
                  <p className="text-slate-500 italic mt-1">Pick domains that match your profile.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {GOALS[selectedGoal.toUpperCase() as keyof typeof GOALS].categories.map((cat) => (
                    <button
                      key={cat} onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2
                        ${selectedCats.includes(cat) ? 'bg-[#0EA5A5] text-white border-[#0EA5A5]' : 'bg-[#FAFAFA] text-slate-500 border-slate-100'}`}
                    >
                      {cat} {selectedCats.includes(cat) && <Check size={14} />}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => router.push('/marketplace')}
                  disabled={selectedCats.length === 0}
                  className={`w-full h-16 rounded-2xl font-bold tracking-widest flex items-center justify-center gap-3 transition-all ${selectedCats.length > 0 ? 'bg-[#FF7A00] text-white shadow-xl shadow-[#FF7A00]/20' : 'bg-slate-100 text-slate-300'}`}
                >
                  START SWIPING <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}