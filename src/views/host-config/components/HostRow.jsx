import React from 'react';
import { Settings, Star, Hash, Clock, Tag as TagIcon } from 'lucide-react';
import { displayHost, formatRelative } from '../helpers/formatters';

const statusPill = (host) =>
  host.is_whitelist
    ? 'bg-emerald-50/90 text-emerald-700 border border-emerald-100'
    : 'bg-rose-50/90 text-rose-700 border border-rose-100';

const statusDot = (host) => (host.is_whitelist ? 'bg-emerald-500' : 'bg-red-500');

const TagPills = ({ tags = [] }) => {
  const visible = tags.slice(0, 3);
  const remaining = tags.length - visible.length;
  if (!tags.length) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[hsl(var(--foreground)/0.4)]">
        <TagIcon size={13} />
        No tags
      </span>
    );
  }
  return (
    <div className="flex items-center flex-wrap gap-1.5">
      {visible.map((t) => (
        <span
          key={t.id}
          title={t.title}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(var(--background)/0.95)] border border-[color:var(--glass-border)] text-[11.5px] font-bold text-[hsl(var(--foreground)/0.72)]"
        >
          {t.config?.emoji && <span className="text-[12px] leading-none">{t.config.emoji}</span>}
          <span className="truncate max-w-[92px]">{t.title}</span>
        </span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.22)] text-[11.5px] font-bold text-primary">
          +{remaining}
        </span>
      )}
    </div>
  );
};

const HostRow = ({ host, onOpen, onEdit }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(host);
  };

  return (
    <tr
      onClick={() => onOpen(host)}
      className="border-b border-[hsl(var(--foreground)/0.05)] hover:bg-[hsl(var(--background)/0.7)] transition-colors duration-200 group cursor-pointer"
    >
      <td className="py-5 px-8 align-middle">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl bg-[hsl(var(--background)/0.95)] flex items-center justify-center overflow-hidden shrink-0 border border-[color:var(--glass-border)] shadow-sm transition-transform group-hover:scale-[1.04] duration-200">
            {host.logo_link ? (
              <img
                src={host.logo_link}
                alt={host.brand_name}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-[hsl(var(--primary-foreground))]">
                  {host.brand_name?.trim().charAt(0)}
                </span>
              </div>
            )}
            {host.is_featured && (
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-[0_2px_8px_hsl(var(--primary)/0.45)]"
                title="Featured"
              >
                <Star size={11} fill="currentColor" strokeWidth={2.5} />
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] font-bold text-[hsl(var(--foreground))] tracking-tight truncate">
              {host.brand_name?.trim()}
            </span>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[hsl(var(--foreground)/0.5)] mt-0.5">
              <Hash size={12} strokeWidth={2.5} />
              <span>sort {host.sort_key ?? '—'}</span>
              <span className="text-[hsl(var(--foreground)/0.25)]">•</span>
              <Clock size={12} strokeWidth={2.5} />
              <span>{formatRelative(host.modified_at)}</span>
            </span>
          </div>
        </div>
      </td>

      <td className="py-5 px-8 align-middle">
        <div className="flex flex-col min-w-0">
          <a
            href={host.host_name}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[14.5px] font-bold text-[hsl(var(--foreground)/0.82)] hover:text-primary transition-colors w-fit truncate max-w-[320px]"
          >
            {displayHost(host.host_name)}
          </a>
          <div className="mt-1.5">
            <TagPills tags={host.tags} />
          </div>
        </div>
      </td>

      <td className="py-5 px-8 align-middle">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-[0.14em] shadow-sm ${statusPill(host)}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${statusDot(host)} shadow-[0_0_8px_hsl(var(--foreground)/0.12)]`}
          />
          <span>{host.is_whitelist ? 'Active' : 'Blacklisted'}</span>
        </div>
      </td>

      <td className="py-5 px-8 text-right align-middle">
        <button
          onClick={handleEditClick}
          aria-label={`Edit ${host.brand_name}`}
          className="p-2.5 text-[hsl(var(--foreground)/0.5)] hover:text-primary hover:bg-[hsl(var(--background))] hover:shadow-sm border border-transparent hover:border-[color:var(--glass-border)] rounded-xl transition-all duration-200 inline-flex group/btn active:scale-90"
        >
          <Settings size={18} strokeWidth={2.5} className="group-hover/btn:rotate-45 transition-transform" />
        </button>
      </td>
    </tr>
  );
};

export default HostRow;
