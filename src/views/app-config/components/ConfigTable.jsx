import React from 'react';
import { Smartphone, Package, Hash, Calendar, ChevronRight, LayoutGrid, Monitor } from 'lucide-react';

const ConfigTable = ({ configs, onRowClick }) => {
  if (configs.length === 0) {
    return (
      <div className="glass rounded-[32px] p-24 flex flex-col items-center justify-center text-center gap-4 border-glass-border">
        <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center mb-2">
          <LayoutGrid className="text-accent opacity-40" size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1 text-foreground/80">No configurations yet</h3>
          <p className="text-foreground/40 max-w-xs font-medium text-sm leading-relaxed">System scan complete. No application builds detected in this environment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-[32px] overflow-hidden shadow-2xl border-glass-border animate-slideUp">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-white/5 border-b border-glass-border">
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30">
                <div className="flex items-center gap-2"><Hash size={14} strokeWidth={3}/> ID</div>
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30 text-center">
                <div className="flex items-center gap-2 justify-center"><Smartphone size={14} strokeWidth={3}/> OS TYPE</div>
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30">
                <div className="flex items-center gap-2"><Package size={14} strokeWidth={3}/> App Version</div>
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30">Package Name</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30">Flavour</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/30">
                <div className="flex items-center gap-2"><Calendar size={14} strokeWidth={3}/> Created</div>
              </th>
              <th className="px-8 py-6 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border/40">
            {configs.map((config) => (
              <tr 
                key={config.id} 
                onClick={() => onRowClick(config.id)} 
                className="group cursor-pointer hover:bg-white/5 transition-all duration-300"
              >
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-accent/10 text-accent font-bold rounded-lg text-xs tracking-tight border border-accent/20">
                    #{config.id}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <span className={`
                      flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider
                      ${config.os.toLowerCase().includes('ios') 
                        ? 'bg-zinc-100 text-zinc-900 border border-zinc-200' 
                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}
                    `}>
                      {config.os.toLowerCase().includes('ios') ? <Monitor size={12} /> : <Smartphone size={12} />}
                      {config.os}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-left">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-foreground/80 group-hover:text-foreground transition-all duration-300">v{config.app_version}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-25">Production Build</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-semibold text-foreground/40">{config.pkg_name}</td>
                <td className="px-8 py-6 text-sm">
                   <span className="px-2 py-0.5 bg-foreground/5 rounded-md border border-glass-border/40 text-foreground/60 font-bold tracking-tighter text-xs">{config.app_flavour}</span>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-foreground/30 whitespace-nowrap">
                  {new Date(config.created_at).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-8 py-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/10 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:shadow-[0_0_15px_rgba(var(--accent),0.2)]">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigTable;
