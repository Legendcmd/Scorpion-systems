
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import AIHub from './components/AIHub';
import ProjectHub from './components/ProjectHub';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('scorpion_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Simulate splash animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6"></div>
        <div className="text-amber-500 font-bold tracking-[0.5em] uppercase animate-pulse">Initializing Scorpion Link...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={(u) => {
      setUser(u);
      localStorage.setItem('scorpion_user', JSON.stringify(u));
    }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'messages': return <Messages user={user} />;
      case 'ai': return <AIHub user={user} />;
      case 'projects': return <ProjectHub user={user} />;
      case 'settings': return <Settings user={user} onUpdate={(u) => {
        setUser(u);
        localStorage.setItem('scorpion_user', JSON.stringify(u));
      }} />;
      default: return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('scorpion_user');
        }} 
      />
      <main className="flex-1 overflow-y-auto hide-scrollbar relative">
        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
