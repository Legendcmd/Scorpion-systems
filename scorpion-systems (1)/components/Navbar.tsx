
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-sm transform rotate-45 flex items-center justify-center overflow-hidden">
            <div className="w-4 h-4 bg-black transform -rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase italic">Scorpion<span className="text-amber-500">Systems</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
          <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
          <a href="#projects" className="hover:text-amber-500 transition-colors">Operations</a>
          <a href="#team" className="hover:text-amber-500 transition-colors">Commanders</a>
          <a href="#contact" className="hover:text-amber-500 transition-colors">Uplink</a>
        </div>

        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black text-xs font-bold uppercase tracking-widest transition-all">
          Join Hub
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
