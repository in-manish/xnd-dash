import React from 'react';
import { MoreHorizontal, User, Clock } from 'lucide-react';
import { pipelineData } from '../mockData';

const EditorialPipeline = () => {
  return (
    <div className="mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-[hsl(var(--foreground))] tracking-tight">Editorial Pipeline</h2>
        <button className="text-sm font-bold text-[hsl(var(--foreground)/0.5)] hover:text-primary transition-colors">View Pipeline Details</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pipelineData.map((column) => (
          <div key={column.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[hsl(var(--foreground))]">{column.title}</span>
                <span className="text-[10px] bg-primary text-[hsl(var(--primary-foreground))] px-1.5 py-0.5 rounded-full font-bold">
                  {column.count}
                </span>
              </div>
              <button className="text-[hsl(var(--foreground)/0.45)] hover:text-primary">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-[300px] p-2 bg-[hsl(var(--background)/0.65)] rounded-[2rem] border border-dashed border-[color:var(--glass-border)]">
              {column.items.map((item) => (
                <div key={item.id} className="glass p-4 rounded-2xl border-[color:var(--glass-border)] hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-600' :
                      item.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-[hsl(var(--background))] text-[hsl(var(--foreground)/0.65)]'
                    }`}>
                      {item.priority}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={14} className="text-[hsl(var(--foreground)/0.45)]" />
                    </button>
                  </div>
                  
                  <h3 className="text-sm font-black text-[hsl(var(--foreground))] leading-snug mb-3">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[hsl(var(--foreground)/0.08)]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[hsl(var(--background))] flex items-center justify-center border border-[color:var(--glass-border)]">
                        <User size={10} className="text-[hsl(var(--foreground)/0.5)]" />
                      </div>
                      <span className="text-[10px] font-bold text-[hsl(var(--foreground)/0.6)]">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[hsl(var(--foreground)/0.45)]">
                      <Clock size={10} />
                      <span className="text-[10px] font-bold italic">2h</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="mt-auto py-3 border-2 border-dashed border-[color:var(--glass-border)] rounded-2xl text-[hsl(var(--foreground)/0.5)] font-bold text-[11px] hover:bg-[hsl(var(--background)/0.9)] hover:text-primary transition-all">
                + Drop Story Here
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorialPipeline;
