import React from 'react';
import { Smartphone, X, Info, ShieldCheck, Loader2, AlertCircle, Hash, Fingerprint } from 'lucide-react';
import DetailRow from './DetailRow';

const ConfigDetailModal = ({ 
  config, 
  onClose, 
  loading, 
  error, 
  onRetry 
}) => {
  if (!config) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      {/* Deep Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-3xl transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border-glass-border overflow-hidden animate-slideUp">
        
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
        
        <div className="flex-1 overflow-y-auto p-10 space-y-16 scrollbar-hide text-left">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-accent/20">
                  <Fingerprint size={24} />
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent animate-pulse">Establishing secure link...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 gap-8 text-center max-w-sm mx-auto">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <AlertCircle size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-red-500">Sync Breach</h3>
                <p className="text-foreground/40 text-sm font-semibold mb-8">{error}</p>
                <button 
                  onClick={() => onRetry(config.id)} 
                  className="px-10 py-4 bg-red-500 text-white hover:opacity-90 rounded-[20px] font-bold text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
                >
                  Force Resync
                </button>
              </div>
            </div>
          ) : (
            <>
              <section className="space-y-8">
                <div className="flex items-center gap-3 text-accent/60">
                  <Fingerprint size={16} strokeWidth={3} />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Core Environment</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 glass p-10 rounded-[32px] bg-white/5 border-glass-border">
                  <DetailRow label="Application Version" value={config.app_version} />
                  <DetailRow label="System Namespace" value={config.pkg_name} />
                  <DetailRow label="Platform Architecture" value={config.os} />
                  <DetailRow label="Deployment Flavour" value={config.app_flavour} />
                  <DetailRow label="Upstream Provider" value={config.package} />
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-3 text-accent/60">
                  <ShieldCheck size={16} strokeWidth={3} />
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">System Interceptors</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 glass p-10 rounded-[32px] bg-white/5 border-glass-border">
                  <DetailRow label="Auth Bypass" value={config.skip_first_login} type="boolean" />
                  <DetailRow label="Classification Skip" value={config.skip_first_category} type="boolean" />
                  <DetailRow label="Tag Intercept" value={config.skip_first_tag} type="boolean" />
                  <DetailRow label="Notification Pref" value={config.skip_notif_pref} type="boolean" />
                  <DetailRow label="Soft Update Hardened" value={config.force_update_soft} type="boolean" />
                  <DetailRow label="Hard Update Hardened" value={config.force_update_hard} type="boolean" />
                  <DetailRow label="Localization Matrix" value={config.languages} />
                </div>
              </section>

              <div className="flex items-center justify-between text-[11px] font-black text-foreground/10 uppercase tracking-widest px-6 border-t border-glass-border pt-10 mt-12 pb-4">
                <div className="flex flex-col gap-2">
                  <span>Initialized Build</span>
                  <span className="text-foreground/30">{config.created_at ? new Date(config.created_at).toLocaleString() : '—'}</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <span>Last Registry Update</span>
                  <span className="text-foreground/30">{config.modified_at ? new Date(config.modified_at).toLocaleString() : '—'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigDetailModal;
