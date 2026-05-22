import Navbar from '../components/landing/Navbar';
import { Exo_2 } from 'next/font/google';
import { Sparkles, ArrowRight, MousePointer2 } from 'lucide-react';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

export default function LandingPage() {
  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9]`}>
      <Navbar />

      {/* HERO SECTION */}
      <main className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#0EA5A5]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-10 animate-bounce">
            <Sparkles size={14} className="text-[#FF7A00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0EA5A5]">The Future of Collaboration</span>
          </div>

          <h1 className="text-6xl lg:text-9xl font-[800] text-[#0D1B2A] tracking-tighter leading-[0.85] italic uppercase mb-10">
            Swipe. <span className="text-[#0EA5A5]">Match.</span><br/>
            Collaborate.
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-500 font-medium leading-relaxed mb-12">
            The elite platform where professional minds and innovative businesses pair up through an intuitive swipe experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="/register" className="group px-10 py-5 bg-[#0D1B2A] text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
              Explore Marketplace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <MousePointer2 size={16} />
              Trusted by 10k+ Forgers
            </div>
          </div>
        </div>
      </main>

      {/* SECTION ANCHORS */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-black text-[#0EA5A5] uppercase tracking-[0.4em] mb-4">Core Features</h2>
          <p className="text-3xl font-bold text-[#0D1B2A]">Engineered for high-speed networking.</p>
        </div>
      </section>
    </div>
  );
}