import React, { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import useTenantStore from '../store/useTenantStore';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { environment, setEnvironment } = useTenantStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="h-24 px-5 md:px-9 bg-[hsl(var(--background)/0.72)] backdrop-blur-xl flex items-center justify-between sticky top-0 z-40 border-b border-[color:var(--glass-border)]">
      <div className="flex items-center gap-6">
        <h2 className="text-[34px] font-extrabold text-[hsl(var(--foreground))] tracking-tight leading-none font-heading">Daily Brief</h2>
        <div 
          onClick={() => setEnvironment(environment === 'prod' ? 'staging' : 'prod')}
          className="flex items-center gap-2.5 px-4 py-2 bg-[hsl(var(--background)/0.75)] hover:bg-[hsl(var(--background)/0.95)] border border-[color:var(--glass-border)] shadow-sm cursor-pointer rounded-full transition-all group active:scale-95"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${environment === 'prod' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
          <span className="text-xs font-bold text-[hsl(var(--foreground)/0.72)] uppercase tracking-wider">
            {environment === 'prod' ? 'Production' : 'Staging'}
          </span>
          <ChevronDown size={16} className="text-[hsl(var(--foreground)/0.45)] group-hover:text-primary transition-colors" />
        </div>
      </div>
 
      <div className="flex-1 max-w-2xl mx-12">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/0.42)] group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-16 py-3.5 bg-[hsl(var(--background)/0.7)] backdrop-blur-sm border border-[color:var(--glass-border)] rounded-2xl text-base focus:bg-[hsl(var(--background)/0.95)] focus:ring-4 focus:ring-primary/10 focus:border-primary/45 outline-none transition-all placeholder:text-[hsl(var(--foreground)/0.42)] font-medium text-[hsl(var(--foreground))] shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 bg-[hsl(var(--background)/0.85)] rounded text-xs font-bold text-[hsl(var(--foreground)/0.42)] border border-[color:var(--glass-border)] pointer-events-none">
            <span className="text-sm">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>
 
      <div className="flex items-center gap-5 shrink-0">
        <div className="flex items-center gap-1">
          <button className="text-[hsl(var(--foreground)/0.45)] hover:text-primary transition-colors p-2 hover:bg-[hsl(var(--background)/0.75)] rounded-xl">
            <Bell size={20} strokeWidth={2} />
          </button>
          <button className="text-[hsl(var(--foreground)/0.45)] hover:text-primary transition-colors p-2 hover:bg-[hsl(var(--background)/0.75)] rounded-xl">
            <HelpCircle size={20} strokeWidth={2} />
          </button>
        </div>
        
        <div className="h-10 w-px bg-[hsl(var(--foreground)/0.12)]"></div>
 
        <div className="w-11 h-11 rounded-2xl bg-[hsl(var(--background)/0.8)] border border-[color:var(--glass-border)] shadow-sm overflow-hidden p-0.5 ml-1 cursor-pointer shrink-0 hover:shadow-md transition-shadow">
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=0f172a&color=fff&bold=true&rounded=true`} 
            alt="User" 
            className="w-full h-full object-cover rounded-[14px]" 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
