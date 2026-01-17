
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('scorpion_directory') || '[]');
      const found = users.find((u: User) => u.username === formData.username && u.password === formData.password);
      if (found) {
        onLogin(found);
      } else {
        setError('Invalid credentials for this uplink.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match.');
      }
      
      const newUser: User = {
        id: crypto.randomUUID(),
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'Field Operative',
        memberSince: new Date().toISOString(),
        status: 'active'
      };

      const users = JSON.parse(localStorage.getItem('scorpion_directory') || '[]');
      if (users.some((u: User) => u.username === newUser.username)) {
        return setError('Username already taken in the hub.');
      }

      users.push(newUser);
      localStorage.setItem('scorpion_directory', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative glass w-full max-w-md p-8 rounded-3xl border-amber-500/20 amber-glow animate-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 mx-auto rounded-xl transform rotate-45 flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-black transform -rotate-45"></div>
          </div>
          <h1 className="text-2xl font-black tracking-widest uppercase italic text-white">
            Scorpion <span className="text-amber-500">Hub</span>
          </h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-[0.2em]">Restricted Access Area</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input 
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                required
              />
              <input 
                placeholder="Email Address" 
                type="email"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </>
          )}
          <input 
            placeholder="Username" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all"
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
            required
          />
          <input 
            placeholder="Password" 
            type="password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />
          {!isLogin && (
            <input 
              placeholder="Confirm Password" 
              type="password"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-500 outline-none transition-all"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          )}

          {error && <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">{error}</p>}

          <button className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-600/20">
            {isLogin ? 'Access System' : 'Create Identity'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 hover:text-amber-500 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            {isLogin ? 'New operative? Sign Up' : 'Already registered? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
