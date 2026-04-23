import React from 'react';
import useTenantStore from '../../../store/useTenantStore';
import { Radio } from 'lucide-react';

const EditorialHeader = () => {
  const { tenant, environment } = useTenantStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-[hsl(var(--foreground))] tracking-tight flex items-center gap-3">
          <span className="text-[hsl(var(--foreground)/0.45)] font-medium">Editor's Desk /</span>
          {tenant?.appName || 'General'}
        </h1>
        <p className="text-[hsl(var(--foreground)/0.62)] font-medium flex items-center gap-2 mt-1">
          <span className={`w-2 h-2 rounded-full ${environment === 'production' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          Managing {environment.toUpperCase()} Environment
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3 border-[color:var(--glass-border)]">
          <div className="relative">
            <Radio size={18} className="text-rose-500 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[hsl(var(--foreground)/0.5)] tracking-wider">Live Readers</span>
            <span className="text-sm font-black text-[hsl(var(--foreground))]">1,284</span>
          </div>
        </div>
        
        <button className="bg-primary text-[hsl(var(--primary-foreground))] px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all">
          New Story
        </button>
      </div>
    </div>
  );
};

export default EditorialHeader;
