'use client';

import { Users, Building2, ListTree, Activity, Clock, ShieldAlert, DollarSign, UserCheck } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-navy min-h-screen text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            PARA<span className="text-orange">PAIR</span> HUB
          </h1>
          <p className="text-teal font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
            System Administration & Control
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Server: Optimal</span>
          </div>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        <motion.div variants={item}><StatCard label="Total Users" value="24.8k" trend={12} icon={Users} variant="teal" /></motion.div>
        <motion.div variants={item}><StatCard label="Businesses" value="1,204" trend={8} icon={Building2} /></motion.div>
        <motion.div variants={item}><StatCard label="Active Listings" value="8,492" trend={-2} icon={ListTree} /></motion.div>
        <motion.div variants={item}><StatCard label="Revenue" value="$42.1k" trend={24} icon={DollarSign} variant="orange" /></motion.div>
        <motion.div variants={item}><StatCard label="Reports" value="14" trend={-50} icon={ShieldAlert} /></motion.div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* CHART SECTION (Glassmorphism Style) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 h-[400px] relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold italic uppercase tracking-tight">Platform Growth</h3>
              <select className="bg-navy border border-white/10 rounded-lg px-3 py-1 text-xs font-bold uppercase">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            {/* Visual Placeholder for Chart */}
            <div className="absolute inset-x-8 bottom-8 top-24 flex items-end gap-2">
              {[40, 70, 45, 90, 65, 80, 50, 100, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-teal/20 hover:bg-teal transition-all rounded-t-lg group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-navy px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    +{h * 10} Users
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USER MANAGEMENT MINI-TABLE */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-bold italic uppercase tracking-tight">Recent Citizens</h3>
              <button className="text-xs font-black text-teal uppercase hover:underline">View All</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/40 text-[10px] uppercase tracking-widest bg-white/[0.02]">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Mode</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4].map((u) => (
                  <tr key={u} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20" />
                      <div className="text-sm font-bold">User_{u}210</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black px-2 py-1 rounded bg-teal/10 text-teal uppercase">Personal</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal" /> Verified
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:text-orange transition-colors opacity-0 group-hover:opacity-100"><ShieldAlert size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTIFICATIONS & ALERTS SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
            <h3 className="text-lg font-bold italic uppercase tracking-tight mb-6">Pending Approvals</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight uppercase">Forge Solutions Ltd</p>
                      <p className="text-[10px] text-white/40 uppercase">Business Verification</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-teal text-navy text-[10px] font-black uppercase rounded-lg hover:brightness-110 transition-all">Approve</button>
                    <button className="flex-1 py-2 border border-white/10 text-white text-[10px] font-black uppercase rounded-lg hover:bg-white/5 transition-all">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange/5 border border-orange/20 rounded-[32px] p-6 relative overflow-hidden">
             <ShieldAlert className="absolute -right-4 -top-4 w-24 h-24 text-orange/10 -rotate-12" />
             <h3 className="text-sm font-black text-orange uppercase tracking-widest mb-4">Critical Alerts</h3>
             <ul className="space-y-3 relative z-10">
               <li className="text-xs flex gap-3 text-white/80">
                 <div className="w-1 h-auto bg-orange rounded-full" />
                 API Rate limit reached (Node_04)
               </li>
               <li className="text-xs flex gap-3 text-white/80">
                 <div className="w-1 h-auto bg-orange rounded-full" />
                 High login failure from IP 192...
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}