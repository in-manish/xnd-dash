import React from 'react';
import { Smartphone, Package, Hash, Calendar, ChevronRight, LayoutGrid, Monitor, ShieldAlert } from 'lucide-react';

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

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
            <tr className="bg-background/35 border-b border-glass-border">
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35">
                <div className="flex items-center gap-2"><Hash size={14} strokeWidth={3}/> ID</div>
              </th>
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35 text-center">
                <div className="flex items-center gap-2 justify-center"><Smartphone size={14} strokeWidth={3}/> OS TYPE</div>
              </th>
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35">
                <div className="flex items-center gap-2"><Package size={14} strokeWidth={3}/> App Version</div>
              </th>
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35">Package Name</th>
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35">Update Policy</th>
              <th className="px-8 py-6 align-middle text-[11px] font-black uppercase tracking-[0.2em] text-foreground/35">
                <div className="flex items-center gap-2"><Calendar size={14} strokeWidth={3}/> Created</div>
              </th>
              <th className="px-8 py-6 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border/40">
            {configs.map((config) => {
              const os = String(config.os || 'unknown');
              const isIos = os.toLowerCase().includes('ios');
              const hasHardUpdate = config.force_update_hard === true || config.force_update_hard === 'true';
              const hasSoftUpdate = config.force_update_soft === true || config.force_update_soft === 'true';

              return (
                <tr 
                  key={config.id} 
                  onClick={() => onRowClick(config)} 
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onRowClick(config);
                    }
                  }}
                  className="group cursor-pointer hover:bg-primary/5 transition-all duration-300"
                >
                  <td className="px-8 py-6 align-middle">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-lg text-xs tracking-tight border border-primary/20">
                      #{config.id}
                    </span>
                  </td>
                  <td className="px-8 py-6 align-middle">
                    <div className="flex justify-center">
                      <span className={`
                        flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider
                        ${isIos
                          ? 'bg-background/60 text-foreground border border-glass-border' 
                          : 'bg-accent/10 text-accent border border-accent/20'}
                      `}>
                        {isIos ? <Monitor size={12} /> : <Smartphone size={12} />}
                        {os}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 align-middle text-left">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-foreground/80 group-hover:text-foreground transition-all duration-300">v{config.app_version || '—'}</span>
                      <span className="text-[10px] uppercase font-black tracking-widest opacity-25">{config.app_flavour || 'No flavour'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 align-middle text-sm font-semibold text-foreground/45">{config.pkg_name || '—'}</td>
                  <td className="px-8 py-6 align-middle text-sm">
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${hasHardUpdate ? 'border-primary/20 bg-primary/10 text-primary' : 'border-glass-border bg-background/45 text-foreground/45'}`}>
                        <ShieldAlert size={12} /> Hard {String(Boolean(hasHardUpdate))}
                      </span>
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${hasSoftUpdate ? 'border-accent/20 bg-accent/10 text-accent' : 'border-glass-border bg-background/45 text-foreground/45'}`}>
                        Soft {String(Boolean(hasSoftUpdate))}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 align-middle text-sm font-bold text-foreground/35 whitespace-nowrap">
                    {formatDate(config.created_at)}
                  </td>
                  <td className="px-8 py-6 align-middle">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/10 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      <ChevronRight size={20} strokeWidth={2.5} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigTable;
