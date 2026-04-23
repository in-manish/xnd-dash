import React from 'react';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { feedActions, rundownItems } from '../mockData';

const NewsroomFeed = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Activity Feed */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-[hsl(var(--foreground))] tracking-tight flex items-center gap-2">
            <Bell size={20} className="text-primary" />
            Live Newsroom Feed
          </h2>
          <button className="text-sm font-bold text-[hsl(var(--foreground)/0.5)] hover:text-primary transition-colors">Mark all read</button>
        </div>
        
        <div className="glass rounded-[2rem] border-[color:var(--glass-border)] overflow-hidden">
          {feedActions.map((action, idx) => (
            <div key={action.id} className={`flex items-center gap-4 p-4 hover:bg-[hsl(var(--background)/0.7)] transition-colors ${idx !== feedActions.length - 1 ? 'border-b border-[hsl(var(--foreground)/0.08)]' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                action.action === 'alert' ? 'bg-rose-50 text-rose-500' : 'bg-[hsl(var(--background))] text-[hsl(var(--foreground)/0.55)]'
              }`}>
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[hsl(var(--foreground)/0.68)]">
                  <span className="font-black text-[hsl(var(--foreground))]">{action.user}</span> {action.action} <span className="font-bold text-[hsl(var(--foreground))] italic">"{action.target}"</span>
                </p>
                <span className="text-[11px] font-bold text-[hsl(var(--foreground)/0.45)]">{action.time}</span>
              </div>
              <button className="p-2 hover:bg-[hsl(var(--background))] rounded-lg transition-colors">
                <ChevronRight size={16} className="text-[hsl(var(--foreground)/0.3)]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Rundown */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-[hsl(var(--foreground))] tracking-tight flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            Today's Rundown
          </h2>
        </div>
        
        <div className="glass p-6 rounded-[2rem] border-[color:var(--glass-border)] flex flex-col gap-6">
          {rundownItems.map((item) => (
            <div key={item.id} className="flex gap-4 group cursor-pointer">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-black text-[hsl(var(--foreground))] leading-none">{item.time}</span>
                <div className="w-px h-full bg-[hsl(var(--foreground)/0.15)] mt-2 group-last:hidden"></div>
              </div>
              <div className="flex-1 pb-6 group-last:pb-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                  {item.type}
                </span>
                <h4 className="text-sm font-black text-[hsl(var(--foreground))] leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
          
          <button className="w-full mt-2 py-3 bg-[hsl(var(--background))] text-[hsl(var(--foreground)/0.58)] font-bold text-xs rounded-xl hover:bg-[hsl(var(--background)/0.82)] transition-colors border border-dashed border-[color:var(--glass-border)]">
            View Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsroomFeed;
