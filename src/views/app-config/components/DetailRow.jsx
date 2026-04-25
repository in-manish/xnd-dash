import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const DetailRow = ({ label, value, type = 'text' }) => {
  const renderValue = () => {
    if (value == null || value === '') {
      return <span className="text-base font-bold text-foreground/35">—</span>;
    }

    if (type === 'boolean' || (typeof value === 'string' && (value === 'true' || value === 'false'))) {
      const isTrue = value === true || value === 'true';
      return (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider
          ${isTrue ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                   : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {isTrue ? <CheckCircle2 size={12} strokeWidth={3} /> : <XCircle size={12} strokeWidth={3} />}
          {String(value)}
        </span>
      );
    }
    
    if (Array.isArray(value)) return (
      <div className="flex flex-wrap gap-2">
        {value.map((v, i) => (
          <span key={i} className="px-2 py-0.5 bg-foreground/5 rounded-md border border-foreground/10 text-[11px] font-bold">
            {v}
          </span>
        ))}
      </div>
    );

    if (typeof value === 'object') {
      return <span className="break-all text-sm font-bold text-foreground/70">{JSON.stringify(value)}</span>;
    }

    return <span className="break-all text-base font-bold text-foreground/80">{String(value)}</span>;
  };

  return (
    <div className="flex flex-col gap-2 group/row">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/25 group-hover/row:text-accent/60 transition-colors">
        {label.replace(/_/g, ' ')}
      </span>
      <div className="flex items-center">
        {renderValue()}
      </div>
    </div>
  );
};

export default DetailRow;
