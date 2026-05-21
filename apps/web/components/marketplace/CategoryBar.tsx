'use client';

const CATEGORIES = {
  work: ['Jobs', 'Freelance', 'Internships', 'Collaborations', 'Clients'],
  hire: ['Technology', 'Engineering', 'AI & Data Science', 'Design', 'Marketing', 'Healthcare']
};

export default function CategoryBar({ goal }: { goal: 'hire' | 'work' }) {
  const activeCats = goal === 'work' ? CATEGORIES.work : CATEGORIES.hire;

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      <button className="whitespace-nowrap px-4 py-2 rounded-full bg-[#0EA5A5] text-xs font-bold shadow-lg shadow-[#0EA5A5]/20">
        All Feed
      </button>
      {activeCats.map((cat) => (
        <button 
          key={cat}
          className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/10 transition-all"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}