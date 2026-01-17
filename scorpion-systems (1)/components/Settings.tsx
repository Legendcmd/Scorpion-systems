
import React, { useState } from 'react';
import { User } from '../types';

const Settings: React.FC<{ user: User, onUpdate: (u: User) => void }> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.fullName);
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass && pass !== confirmPass) return setStatusMsg('Passwords mismatch');
    
    const updated = { ...user, fullName: name };
    if (pass) updated.password = pass;
    
    onUpdate(updated);
    setStatusMsg('Profile successfully updated.');
    setPass('');
    setConfirmPass('');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-700">
      <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-12">User <span className="text-amber-500">Configuration</span></h2>
      
      <form onSubmit={handleUpdate} className="space-y-8 glass p-10 rounded-3xl border-white/5">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Login Identity (Locked)</label>
          <input 
            value={user.username}
            readOnly
            className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-gray-600 cursor-not-allowed text-sm font-mono"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Display Designation (Full Name)</label>
          <input 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Update Access Code</label>
            <input 
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="New Code"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Confirm Code</label>
            <input 
              type="password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              placeholder="Confirm"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {statusMsg && <p className="text-amber-500 text-xs font-bold uppercase tracking-widest text-center">{statusMsg}</p>}

        <button className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-amber-600/20">
          Sync Profile
        </button>
      </form>

      <div className="mt-12 glass p-10 rounded-3xl border-white/5 bg-amber-500/5">
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500 mb-6">Account Metadata</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
            <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Account Index</span>
            <span className="mono text-gray-300 select-all">{user.id}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Node Initialized</span>
            <span className="font-bold">{new Date(user.memberSince).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
