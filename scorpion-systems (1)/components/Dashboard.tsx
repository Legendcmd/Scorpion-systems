
import React, { useState, useEffect, useRef } from 'react';
import { User, WorkSession, UserStatus } from '../types';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [isWorking, setIsWorking] = useState(false);
  const [currentSessionTime, setCurrentSessionTime] = useState(0);
  const [history, setHistory] = useState<WorkSession[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Load local history
    const saved = localStorage.getItem(`sessions_${user.id}`);
    if (saved) setHistory(JSON.parse(saved));
  }, [user.id]);

  const toggleWork = () => {
    if (isWorking) {
      // Stop session
      const endTime = Date.now();
      const newSession: WorkSession = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString(),
        startTime: Date.now() - currentSessionTime,
        endTime,
        duration: currentSessionTime
      };
      const updatedHistory = [newSession, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(`sessions_${user.id}`, JSON.stringify(updatedHistory));
      
      if (timerRef.current) clearInterval(timerRef.current);
      setIsWorking(false);
      setCurrentSessionTime(0);
    } else {
      // Start session
      setIsWorking(true);
      const start = Date.now();
      timerRef.current = window.setInterval(() => {
        setCurrentSessionTime(Date.now() - start);
      }, 1000);
    }
  };

  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const statusColors = {
    active: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-amber-500'
  };

  const totalWorkedToday = history
    .filter(s => s.date === new Date().toLocaleDateString())
    .reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            Welcome, <span className="text-amber-500">{user.fullName}</span>
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Command Center Online</p>
        </div>
        
        <div className="flex items-center gap-6 glass p-3 px-6 rounded-2xl border-white/5">
          <div className="flex gap-2">
            {(['active', 'busy', 'away', 'offline'] as UserStatus[]).map(s => (
              <button 
                key={s}
                onClick={() => setStatus(s)}
                className={`w-3 h-3 rounded-full transition-all ${statusColors[s]} ${status === s ? 'ring-4 ring-white/10 scale-125' : 'opacity-30'}`}
                title={s}
              />
            ))}
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="text-xs font-bold uppercase tracking-[0.2em]">Status: <span className="text-amber-500 italic">{status}</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 glass p-8 rounded-3xl relative overflow-hidden amber-glow group">
           <div className="relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500 mb-6">Current Work Pulse</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="text-7xl font-black mono tracking-tighter tabular-nums">
                {formatDuration(currentSessionTime)}
              </div>
              <button 
                onClick={toggleWork}
                className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  isWorking 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-black' 
                    : 'bg-amber-600 text-black hover:bg-amber-500 shadow-xl shadow-amber-600/30'
                }`}
              >
                {isWorking ? 'Stop Session' : 'Start Working'}
              </button>
            </div>
           </div>
           <div className={`absolute bottom-0 right-0 p-8 opacity-5 transition-transform duration-1000 ${isWorking ? 'animate-spin scale-150' : ''}`}>
             <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m19.07 4.93-14.14 14.14"/></svg>
           </div>
        </div>

        <div className="space-y-4">
           {[
             { label: 'Today', value: totalWorkedToday },
             { label: 'This Week', value: totalWorkedToday * 4.2 }, // Simulated week math
             { label: 'This Month', value: totalWorkedToday * 18.5 }, // Simulated month math
           ].map(stat => (
             <div key={stat.label} className="glass p-6 rounded-2xl border-white/5 flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
               <span className="text-xl font-bold mono">{formatDuration(stat.value).split(':')[0]}h {formatDuration(stat.value).split(':')[1]}m</span>
             </div>
           ))}
        </div>
      </div>

      <section>
        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-amber-500 mb-6">Log History</h3>
        <div className="glass rounded-3xl overflow-hidden border-white/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-500 uppercase text-[10px] tracking-[0.3em] font-bold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-600 italic">No historical logs retrieved from node.</td>
                </tr>
              )}
              {history.map(session => (
                <tr key={session.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold">{session.date}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(session.startTime).toLocaleTimeString()}</td>
                  <td className="px-6 py-4 text-gray-400">{session.endTime ? new Date(session.endTime).toLocaleTimeString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-amber-500 font-bold">{formatDuration(session.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Username</span>
          <span className="text-sm font-bold">@{user.username}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Role</span>
          <span className="text-sm font-bold text-amber-500 italic">{user.role}</span>
        </div>
        <div className="md:col-span-2 text-right">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Member Since</span>
          <span className="text-sm font-bold">{new Date(user.memberSince).toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
