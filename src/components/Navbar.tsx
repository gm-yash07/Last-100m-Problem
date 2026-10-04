import React, { useState } from 'react';
import { Compass, Navigation, Layers, ShieldAlert, Cpu, Calculator, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#overview" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('overview');
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5 hover:text-cyan-400 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-extrabold tracking-tight">Last 100 Metres</span>
          <span className="text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">Curb2Door</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('overview')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'overview' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            The Crisis
          </button>
          <button
            onClick={() => handleNavClick('journey')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'journey' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            Journey Sim
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'simulator' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            Digital Twin
          </button>
          <button
            onClick={() => handleNavClick('sectors')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'sectors' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            Impact Sectors
          </button>
          <button
            onClick={() => handleNavClick('barriers')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'barriers' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            Core Barriers
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`transition-colors text-left hover:text-white cursor-pointer ${
              activeTab === 'calculator' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-1' : ''
            }`}
          >
            ROI Impact
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('generator')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            Generate Micro-Geocode
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => handleNavClick('overview')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            The Crisis
          </button>
          <button
            onClick={() => handleNavClick('journey')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Journey Sim
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Digital Twin
          </button>
          <button
            onClick={() => handleNavClick('sectors')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Impact Sectors
          </button>
          <button
            onClick={() => handleNavClick('barriers')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Core Barriers
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
          >
            ROI Impact
          </button>
          <button
            onClick={() => handleNavClick('generator')}
            className="block w-full text-center py-2.5 px-3 rounded-lg font-semibold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 mt-2"
          >
            Generate Micro-Geocode
          </button>
        </div>
      )}
    </header>
  );
};

