import React from 'react';
import { HelpCircle, Globe, Shield } from 'lucide-react';

export default function Navigation({ view, setView }) {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2">
          <div className="text-primary font-black text-2xl tracking-tighter italic">
            HFD
          </div>
          <div className="text-secondary font-semibold text-sm leading-tight">
            Logistics <br/>
            <span className="text-slate-400 text-xs font-normal">Solutions</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-slate-600">
          <button 
            onClick={() => setView(view === 'admin' ? 'customer' : 'admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === 'admin' ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">{view === 'admin' ? 'Customer View' : 'Admin Dashboard'}</span>
          </button>
          
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">English</span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Help</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
