
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { User } from '../types';

const AIHub: React.FC<{ user: User }> = ({ user }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: `System online, ${user.fullName}. How can Scorpion AI accelerate your current objective?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the Scorpion AI, technical support for Scorpion Systems employees. Be extremely technical, precise, and helpful with code, architecture, and logic. Use a sharp, slightly futuristic tone.",
          temperature: 0.7,
        },
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection timing out." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Uplink failure. Please verify your credentials or network status." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] glass rounded-3xl border-white/5 overflow-hidden flex flex-col animate-in zoom-in duration-500">
      <div className="p-6 bg-amber-500/10 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-amber-500">Scorpion Intelligence Engine v4.0</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-6 rounded-3xl ${m.role === 'user' ? 'bg-amber-600 text-black font-bold amber-glow' : 'bg-white/5 border border-white/10 text-gray-300 leading-relaxed'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex gap-2">
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
             </div>
           </div>
        )}
      </div>

      <div className="p-8 border-t border-white/5 bg-black/40">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Input technical query..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500 transition-all"
          />
          <button 
            onClick={handleSend}
            className="px-8 bg-amber-600 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20"
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIHub;
