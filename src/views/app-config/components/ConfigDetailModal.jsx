import React from 'react';
import { createPortal } from 'react-dom';
import { Smartphone, X, ShieldCheck, Hash, Fingerprint, Database } from 'lucide-react';
import DetailRow from './DetailRow';

const CORE_FIELDS = ['id', 'app_version', 'pkg_name', 'os', 'app_flavour'];
const POLICY_FIELDS = [
  'skip_first_login',
  'skip_first_category',
  'skip_first_tag',
  'skip_notif_pref',
  'force_update_soft',
  'force_update_hard',
];

const ConfigDetailModal = ({ config, onClose }) => {
  if (!config) return null;

  const entries = Object.entries(config);
  const getValue = (field) => config[field];

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      {/* Deep Backdrop Blur */}
      <div 
        className="fixed inset-0 bg-background/45 backdrop-blur-xl transition-opacity animate-fadeIn" 
      />
      
      <div className="pointer-events-auto relative flex max-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col glass rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border-glass-border overflow-hidden animate-slideUp">
        
        {/* Header */}
        <div className="p-10 pb-6 flex items-center justify-between border-b border-glass-border">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-3xl bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20">
              <Smartphone size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">Build Intelligence</h2>
              <p className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.2em] flex items-center gap-2">
                <Hash size={12} strokeWidth={3} /> {config.id} • v{config.app_version || 'Scan...'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/20 hover:text-foreground hover:bg-foreground/5 transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-10 space-y-16 text-left">
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-primary/70">
              <Fingerprint size={16} strokeWidth={3} />
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Core Environment</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 glass p-10 rounded-[32px] bg-background/40 border-glass-border">
              {CORE_FIELDS.map((field) => (
                <DetailRow key={field} label={field} value={getValue(field)} />
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-3 text-primary/70">
              <ShieldCheck size={16} strokeWidth={3} />
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">System Interceptors</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 glass p-10 rounded-[32px] bg-background/40 border-glass-border">
              {POLICY_FIELDS.map((field) => (
                <DetailRow key={field} label={field} value={getValue(field)} type="boolean" />
              ))}
              <DetailRow label="languages" value={config.languages} />
              <DetailRow label="language" value={config.language} />
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-3 text-primary/70">
              <Database size={16} strokeWidth={3} />
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Complete Payload</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 glass p-10 rounded-[32px] bg-background/40 border-glass-border">
              {entries.map(([field, value]) => (
                <DetailRow key={field} label={field} value={value} />
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between text-[11px] font-black text-foreground/20 uppercase tracking-widest px-6 border-t border-glass-border pt-10 mt-12 pb-4">
            <div className="flex flex-col gap-2">
              <span>Initialized Build</span>
              <span className="text-foreground/40">{config.created_at ? new Date(config.created_at).toLocaleString() : '—'}</span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span>Last Registry Update</span>
              <span className="text-foreground/40">{config.modified_at ? new Date(config.modified_at).toLocaleString() : '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfigDetailModal;
