import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockStats } from '../mockData';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {mockStats.map((stat, idx) => (
        <div key={idx} className="glass p-5 rounded-[2rem] border-[color:var(--glass-border)] flex flex-col gap-1 relative overflow-hidden group hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-primary/30 group-hover:scale-125 transition-transform">
            <TrendingUp size={64} />
          </div>
          
          <span className="text-[11px] font-extrabold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.1em]">{stat.label}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[hsl(var(--foreground))] leading-none">{stat.value}</span>
            <div className={`flex items-center text-[11px] font-bold ${
              stat.trend === 'up' ? 'text-emerald-500' : stat.trend === 'down' ? 'text-rose-500' : 'text-[hsl(var(--foreground)/0.45)]'
            }`}>
              {stat.trend === 'up' ? <TrendingUp size={12} /> : stat.trend === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
