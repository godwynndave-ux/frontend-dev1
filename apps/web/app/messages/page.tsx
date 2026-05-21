'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Send, MoreHorizontal, CheckCheck, Sparkles } from 'lucide-react';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

const CHATS = [
  { id: 1, name: 'Maya L.', role: 'Graphic Designer', lastMsg: 'I love the project concept!', time: '2m', unread: 2, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { id: 2, name: 'StackForge', role: 'Enterprise', lastMsg: 'When can we start the intake?', time: '1h', unread: 0, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
];

export default function MessagesPage() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<any>(CHATS[0]);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9] text-[#0D1B2A] flex h-screen overflow-hidden`}>
      
      {/* SIDEBAR: CONVERSATION LIST */}
      <aside className={`${selectedChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-[400px] flex-col bg-white border-r border-slate-200`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-2">
                <button onClick={() => router.push('/marketplace')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black italic tracking-tighter uppercase">Inbox</h1>
             </div>
             <button className="w-10 h-10 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full flex items-center justify-center">
                <Sparkles size={18} fill="currentColor" />
             </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[#F3F6F9] border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#0EA5A5]/20 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-5 flex items-center gap-4 transition-all border-b border-slate-50 ${selectedChat?.id === chat.id ? 'bg-[#0EA5A5]/5 border-l-4 border-l-[#0EA5A5]' : 'hover:bg-slate-50'}`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                <img src={chat.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-extrabold text-sm tracking-tight">{chat.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-[#FF7A00] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-[#FF7A00]/30">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT: ACTIVE CHAT */}
      <main className={`${selectedChat ? 'flex' : 'hidden lg:flex'} flex-1 flex-col bg-[#F8FBFC] relative`}>
        {selectedChat ? (
          <>
            {/* CHAT HEADER */}
            <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                  <img src={selectedChat.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">{selectedChat.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold text-[#0EA5A5] uppercase tracking-widest">Matched Professional</p>
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-[#0D1B2A] transition-colors"><MoreHorizontal /></button>
            </header>

            {/* MESSAGE FEED */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="flex justify-start">
                <div className="max-w-[70%] bg-white border border-slate-100 p-5 rounded-[28px] rounded-tl-none shadow-sm">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                    "Hey! I saw your profile on PARAPair and loved your design style. Would you be open to a quick collaboration call?"
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="max-w-[70%] bg-[#0D1B2A] p-5 rounded-[28px] rounded-tr-none text-white shadow-xl shadow-slate-200">
                  <p className="text-sm font-bold leading-relaxed">
                    Absolutely! I'm free tomorrow after 2:00 PM. Let's build something great together.
                  </p>
                  <div className="flex justify-end mt-2 opacity-30"><CheckCheck size={14} /></div>
                </div>
              </div>
            </div>

            {/* INPUT AREA */}
            <div className="p-8 bg-white border-t border-slate-200">
              <div className="flex items-center gap-4 bg-[#F3F6F9] rounded-[24px] px-6 py-2 focus-within:ring-2 focus-within:ring-[#0EA5A5]/20 transition-all">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-transparent py-4 text-sm font-bold outline-none placeholder:text-slate-400"
                />
                <button className="w-12 h-12 bg-[#FF7A00] text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#FF7A00]/20">
                  <Send size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 opacity-50 grayscale">
            <Sparkles size={80} className="mb-6" />
            <h3 className="font-extrabold uppercase tracking-[0.4em] text-sm">Select a pair to start forging</h3>
          </div>
        )}
      </main>
    </div>
  );
}