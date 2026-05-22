'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${exo2.className} fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0D1B2A] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xs italic">PA</span>
          </div>
          <span className="font-[800] tracking-tighter text-2xl italic uppercase text-[#0D1B2A]">
            Para<span className="text-[#FF7A00]">Pair</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-bold text-slate-500 hover:text-[#0EA5A5] transition-colors uppercase tracking-widest">
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-xs font-black uppercase tracking-widest text-[#0D1B2A] hover:text-[#0EA5A5] transition-colors">
            Login
          </Link>
          <Link href="/register" className="group flex items-center gap-2 px-6 py-3 bg-[#FF7A00] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xl shadow-[#FF7A00]/20 hover:scale-105 active:scale-95 transition-all">
            Get Started
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button className="lg:hidden p-2 text-[#0D1B2A]" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-screen bg-[#0D1B2A] z-[110] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-black text-xl italic uppercase text-white">Para<span className="text-[#FF7A00]">Pair</span></span>
              <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-black text-white/40 hover:text-[#0EA5A5] transition-colors italic uppercase tracking-tighter">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <Link href="/register" className="w-full py-5 bg-[#FF7A00] text-white text-center font-black uppercase rounded-xl">Get Started</Link>
              <Link href="/login" className="w-full py-5 border-2 border-white/10 text-white text-center font-black uppercase rounded-xl">Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}