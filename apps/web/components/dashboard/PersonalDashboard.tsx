'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  Zap, 
  ChevronRight, 
  UserCheck, 
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function PersonalDashboard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else if (file) {
      alert("Please upload PDF files only.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 text-white">
      <div className="lg:col-span-2 space-y-6">
        
        {/* TOP METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Matched Pairs" value="42" icon={Heart} color="#0EA5A5" />
          <StatCard label="Profile Views" value="1.2k" icon={Eye} color="#FFFFFF" />
          <StatCard label="Forge Score" value="98" icon={Zap} color="#FF7A00" />
        </div>
        
        {/* CV UPLOAD & FORGE DOCUMENTS */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#0EA5A5]/10 rounded-lg text-[#0EA5A5]">
              <FileText size={20} />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">Forge Documents</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Zone */}
            <div className="space-y-4">
              <label className="relative group cursor-pointer block">
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <div className={`border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center text-center gap-3 ${
                  fileName ? 'border-[#0EA5A5] bg-[#0EA5A5]/5' : 'border-white/10 bg-white/5 hover:border-[#0EA5A5]/40 hover:bg-white/[0.07]'
                }`}>
                  <UploadCloud size={32} className={fileName ? 'text-[#0EA5A5]' : 'text-white/20'} />
                  <div>
                    <p className="text-sm font-bold tracking-tight">
                      {fileName ? fileName : 'Upload Professional CV'}
                    </p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">
                      PDF Format Only (Max 5MB)
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Legal & Submission */}
            <div className="flex flex-col justify-between py-2">
              <div className="space-y-4">
                <p className="text-xs text-white/40 leading-relaxed font-medium">
                  Ensure your CV is updated to increase your Match Strength. By uploading, you enable businesses to view your professional history.
                </p>
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                      checked={isAgreed}
                      onChange={() => setIsAgreed(!isAgreed)}
                    />
                    <div className="h-5 w-5 bg-white/5 border border-white/20 rounded-md peer-checked:bg-[#0EA5A5] peer-checked:border-[#0EA5A5] transition-all flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-[#0D1B2A] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white/60 leading-tight group-hover:text-white transition-colors uppercase tracking-tight">
                    I accept the <a href="#" className="text-[#0EA5A5] hover:underline inline-flex items-center gap-0.5">Terms & Conditions <ExternalLink size={8} /></a> and <a href="#" className="text-[#0EA5A5] hover:underline inline-flex items-center gap-0.5">Privacy Policy <ExternalLink size={8} /></a>
                  </span>
                </label>
              </div>

              <button 
                disabled={!fileName || !isAgreed}
                className={`w-full mt-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
                  fileName && isAgreed 
                  ? 'bg-[#0EA5A5] text-[#0D1B2A] shadow-lg shadow-[#0EA5A5]/20 hover:scale-[1.02]' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                Secure Forge Document
              </button>
            </div>
          </div>
        </div>

        {/* RECENT MATCHES (Existing Feature) */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles size={120} />
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-8 text-[#0EA5A5]">Recent Forge Matches</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-[#0EA5A5]/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-black italic text-[#0EA5A5] text-xl border border-white/10">
                    {i === 1 ? 'SF' : 'NI'}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white tracking-tight uppercase">
                      {i === 1 ? 'StackForge Agency' : 'Neural Intel'}
                    </h4>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1 italic">Confirmed Partnership</p>
                  </div>
                </div>
                <ChevronRight className="text-white/10 group-hover:text-[#0EA5A5] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* USER PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl h-fit">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#0EA5A5] to-[#FF7A00] p-1 rotate-3">
              <div className="w-full h-full rounded-[20px] bg-[#0D1B2A] p-1">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" alt="Avatar" className="rounded-[18px]" />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#0EA5A5] rounded-xl border-4 border-[#0D1B2A] flex items-center justify-center shadow-lg">
              <UserCheck size={18} className="text-[#0D1B2A]" />
            </div>
          </div>
          
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Kevin France</h2>
          <p className="text-[#0EA5A5] font-bold text-[11px] uppercase tracking-[0.3em] mt-2">Verified Professional</p>
          
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-10 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-[#0EA5A5]" />
          </div>
          <div className="flex justify-between w-full mt-3">
             <span className="text-[9px] font-black uppercase text-white/20">Profile Strength</span>
             <span className="text-[9px] font-black uppercase text-[#0EA5A5]">85%</span>
          </div>
          
          <button className="w-full mt-12 py-5 bg-[#FF7A00] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FF7A00]/20">
            Edit Forge Identity
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-7 rounded-[32px] hover:bg-white/[0.07] transition-all group">
      <div className="flex flex-col gap-4 text-white">
        <Icon size={24} style={{ color }} className="opacity-80 group-hover:scale-110 transition-transform" />
        <div>
          <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">{label}</p>
          <h3 className="text-4xl font-black italic tracking-tighter">{value}</h3>
        </div>
      </div>
    </div>
  );
}