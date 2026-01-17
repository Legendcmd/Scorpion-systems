
import React, { useState } from 'react';
import { User } from '../types';

const Messages: React.FC<{ user: User }> = ({ user }) => {
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  const contacts = [
    { id: '1', name: 'Alex "Venom"', role: 'Architect', avatar: 'https://picsum.photos/seed/v1/100' },
    { id: '2', name: 'Sarah "Stinger"', role: 'AI Lead', avatar: 'https://picsum.photos/seed/v2/100' },
    { id: '3', name: 'Marcus "Apex"', role: 'Strategy', avatar: 'https://picsum.photos/seed/v3/100' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="w-80 glass rounded-3xl p-6 border-white/5 flex flex-col">
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500 mb-8">Uplink Directory</h3>
        <div className="space-y-2 flex-1 overflow-y-auto hide-scrollbar">
          {contacts.map(c => (
            <button 
              key={c.id}
              onClick={() => setActiveContact(c.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeContact === c.id ? 'bg-amber-600 text-black amber-glow' : 'hover:bg-white/5 border border-transparent hover:border-white/10'}`}
            >
              <img src={c.avatar} className="w-10 h-10 rounded-full grayscale brightness-75 border border-white/10" alt="" />
              <div className="text-left">
                <div className="text-sm font-bold truncate">{c.name}</div>
                <div className={`text-[10px] uppercase tracking-widest ${activeContact === c.id ? 'text-black/60' : 'text-gray-500'}`}>{c.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass rounded-3xl p-8 border-white/5 flex flex-col relative overflow-hidden">
        {activeContact ? (
          <>
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
               <img src={contacts.find(c => c.id === activeContact)?.avatar} className="w-12 h-12 rounded-full border border-amber-500/50" alt="" />
               <div>
                 <div className="text-lg font-bold">{contacts.find(c => c.id === activeContact)?.name}</div>
                 <div className="text-xs text-green-500 font-bold uppercase tracking-widest animate-pulse">Node Securely Encrypted</div>
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-gray-600 italic">
               <div className="bg-white/5 p-12 rounded-full mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               </div>
               <p className="text-xs uppercase tracking-widest">Chat history cleared by retention protocol.</p>
               <p className="text-[10px] mt-2">New messages will be stored for 24 hours.</p>
            </div>

            <div className="mt-auto flex gap-4 bg-black/40 p-4 rounded-3xl border border-white/10">
               <input 
                 value={message}
                 onChange={e => setMessage(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && setMessage('')}
                 placeholder="Type encrypted message..."
                 className="flex-1 bg-transparent outline-none text-sm px-4"
               />
               <button 
                 onClick={() => setMessage('')}
                 className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center hover:bg-amber-500 transition-all text-black shadow-lg"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
               </button>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600">
             <div className="p-8 bg-white/5 rounded-full mb-6 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9l5.7-1.3z"/></svg>
             </div>
             <p className="font-bold uppercase tracking-widest text-xs">Establish a connection to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
