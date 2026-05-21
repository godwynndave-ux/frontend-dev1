'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Key, ArrowRight, Activity, Terminal, AlertCircle } from 'lucide-react';
import { Exo_2 } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const exo2 = Exo_2({ subsets: ['latin'] });

export default function AdminLoginPage() {
  const router = useRouter();
  
  // State Management
  const [identifier, setIdentifier] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Development Credentials Validation
    if (identifier === 'ADM-PARA-2024' && securityKey === 'ForgeAdmin123') {
      setIsLoading(true);
      
      // Simulate High-Security Server Handshake
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1800);
    } else {
      // Trigger error state if credentials fail
      setError('INVALID CLEARANCE: Access Denied to ParaPair Core.');
      // Visual feedback: reset fields or shake
    }
  };

  return (
    <div className={`${exo2.className} min-h-screen bg-[#0D1B2A] text-white flex items-center justify-center relative overflow-hidden p-6`}>
      
      {/* BACKGROUND TECH ELEMENTS */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#0EA5A5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0EA5A5]/10 z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* LOGO AREA */}
        <div className="text-center mb-10">
          <motion.div 
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-2xl"
          >
            <ShieldCheck className={error ? "text-[#FF7A00]" : "text-[#0EA5A5]"} size={40} />
          </motion.div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">
            PARA<span className="text-[#FF7A00]">PAIR</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-4 bg-[#0EA5A5] opacity-50" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0EA5A5]">System Administrator</p>
            <div className="h-[1px] w-4 bg-[#0EA5A5] opacity-50" />
          </div>
        </div>

        {/* SECURITY CARD */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form className="space-y-6" onSubmit={handleAdminAccess}>
            
            {/* ADMIN ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Access Identifier</label>
              <div className="relative group">
                <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#0EA5A5] transition-colors" />
                <input 
                  required
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ADM-XXXX-XXXX"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-[#0EA5A5]/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Security Key</label>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#0EA5A5] transition-colors" />
                <input 
                  required
                  type="password" 
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0EA5A5]/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            {/* ERROR FEEDBACK */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-xl flex items-center gap-3 text-[#FF7A00]"
                >
                  <AlertCircle size={16} />
                  <p className="text-[10px] font-black uppercase tracking-wider">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MFA STATUS INDICATOR */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0EA5A5]/10 flex items-center justify-center text-[#0EA5A5]">
                <Activity size={20} className={isLoading ? "animate-pulse" : ""} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Secure Tunnel</p>
                <p className="text-xs font-bold text-[#0EA5A5]">
                  {isLoading ? 'Decrypting Clearance...' : 'Encrypted Connection Active'}
                </p>
              </div>
            </div>

            {/* SUBMIT */}
            <button 
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black italic uppercase tracking-widest text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2 group ${
                isLoading 
                  ? 'bg-white/10 text-white/20' 
                  : 'bg-[#0EA5A5] hover:bg-[#0EA5A5]/80 text-[#0D1B2A]'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0D1B2A]/30 border-t-[#0D1B2A] rounded-full animate-spin" />
              ) : (
                <>
                  Initialize Session
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-between items-center px-4">
          <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-[#FF7A00] transition-colors">
            User Portal
          </Link>
          <div className="flex items-center gap-1.5 opacity-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5A5]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">System v1.0.42</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}