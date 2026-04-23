import React, { useState } from 'react';
import {
  X,
  Pencil,
  Globe,
  ExternalLink,
  Star,
  Hash,
  Calendar,
  Copy,
  Check,
  Shield,
  ShieldOff,
  Tag as TagIcon,
} from 'lucide-react';
import { displayHost, formatDate, formatRelative } from '../helpers/formatters';

const MetaCell = ({ icon: Icon, label, value, accent = false }) => (
  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[hsl(var(--background)/0.6)] border border-[color:var(--glass-border)]">
    <div
      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        accent
          ? 'bg-[hsl(var(--primary)/0.14)] text-primary border border-[hsl(var(--primary)/0.25)]'
          : 'bg-[hsl(var(--foreground)/0.05)] text-[hsl(var(--foreground)/0.7)] border border-[hsl(var(--foreground)/0.1)]'
      }`}
    >
      <Icon size={15} />
    </div>
    <div className="min-w-0">
      <div className="text-[10px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em]">
        {label}
      </div>
      <div className="text-[13px] font-bold text-[hsl(var(--foreground))] mt-0.5 truncate">
        {value}
      </div>
    </div>
  </div>
);

const TagCard = ({ tag }) => (
  <div
    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[hsl(var(--background)/0.72)] border border-[color:var(--glass-border)] hover:border-[hsl(var(--primary)/0.4)] transition-colors"
    title={tag.slug}
  >
    <span className="shrink-0 w-7 h-7 rounded-lg bg-[hsl(var(--background))] border border-[color:var(--glass-border)] flex items-center justify-center text-[14px]">
      {tag.config?.emoji || '•'}
    </span>
    <div className="min-w-0">
      <div className="text-[13px] font-bold text-[hsl(var(--foreground))] truncate leading-tight">
        {tag.title}
      </div>
      {tag.slug && (
        <div className="text-[11px] font-semibold text-[hsl(var(--foreground)/0.48)] truncate mt-0.5">
          /{tag.slug}
        </div>
      )}
    </div>
  </div>
);

const HostDetailsModal = ({ host, onClose, onEdit }) => {
  const [copied, setCopied] = useState(false);
  if (!host) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(host.share_text || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-fadeIn text-left">
      <div
        className="absolute inset-0 bg-[hsl(var(--background)/0.55)] backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.9)] backdrop-blur-2xl shadow-[0_24px_60px_hsl(var(--foreground)/0.22)] animate-slideUp">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_70%)]" />

        <header className="relative shrink-0 px-7 md:px-8 py-5 flex items-start justify-between gap-4 border-b border-[hsl(var(--foreground)/0.1)]">
          <div className="flex items-start gap-4 min-w-0">
            <div className="relative w-14 h-14 rounded-2xl bg-[hsl(var(--background)/0.95)] border border-[color:var(--glass-border)] shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
              {host.logo_link ? (
                <img
                  src={host.logo_link}
                  alt={host.brand_name}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <span className="text-xl font-bold text-primary">
                  {host.brand_name?.trim().charAt(0)}
                </span>
              )}
              {host.is_featured && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-[0_2px_8px_hsl(var(--primary)/0.45)]">
                  <Star size={11} fill="currentColor" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-[19px] font-bold text-[hsl(var(--foreground))] font-heading tracking-tight truncate">
                {host.brand_name?.trim()}
              </h2>
              <a
                href={host.host_name}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[hsl(var(--foreground)/0.6)] hover:text-primary mt-1 transition-colors"
              >
                <Globe size={13} />
                <span className="truncate">{displayHost(host.host_name)}</span>
                <ExternalLink size={12} className="shrink-0 opacity-70" />
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[hsl(var(--foreground)/0.55)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background)/0.75)] border border-transparent hover:border-[color:var(--glass-border)] transition-all active:scale-90"
          >
            <X size={18} />
          </button>
        </header>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          <div className="h-full overflow-y-auto px-7 md:px-8 pt-6 pb-8 space-y-6 [scrollbar-width:thin] [scrollbar-color:hsl(var(--foreground)/0.15)_transparent]">
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetaCell
                  icon={host.is_whitelist ? Shield : ShieldOff}
                  label="Status"
                  value={host.is_whitelist ? 'Active' : 'Blacklisted'}
                  accent={host.is_whitelist}
                />
                <MetaCell icon={Hash} label="Sort Key" value={host.sort_key ?? '—'} />
                <MetaCell
                  icon={Star}
                  label="Featured"
                  value={host.is_featured ? 'Yes' : 'No'}
                  accent={host.is_featured}
                />
                <MetaCell
                  icon={Calendar}
                  label="Updated"
                  value={formatRelative(host.modified_at)}
                />
              </div>
            </section>

            {host.description && (
              <section className="space-y-2">
                <h3 className="text-[11px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em]">
                  Description
                </h3>
                <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground)/0.8)] font-medium">
                  {host.description}
                </p>
              </section>
            )}

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em] flex items-center gap-2">
                  <TagIcon size={12} />
                  <span>Tags ({host.tags?.length || 0})</span>
                </h3>
              </div>
              {host.tags?.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {host.tags.map((t) => (
                    <TagCard key={t.id} tag={t} />
                  ))}
                </div>
              ) : (
                <div className="text-[13px] font-semibold text-[hsl(var(--foreground)/0.5)] p-3 rounded-xl bg-[hsl(var(--background)/0.6)] border border-dashed border-[hsl(var(--foreground)/0.18)]">
                  No tags assigned.
                </div>
              )}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[hsl(var(--background)/0.6)] border border-[color:var(--glass-border)]">
                <div className="text-[10px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em]">
                  Created
                </div>
                <div className="text-[13px] font-bold text-[hsl(var(--foreground))] mt-1">
                  {formatDate(host.created_at)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[hsl(var(--background)/0.6)] border border-[color:var(--glass-border)]">
                <div className="text-[10px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em]">
                  Last Modified
                </div>
                <div className="text-[13px] font-bold text-[hsl(var(--foreground))] mt-1">
                  {formatDate(host.modified_at)}
                </div>
              </div>
            </section>

            {host.share_text && (
              <section className="space-y-2">
                <h3 className="text-[11px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.14em]">
                  Share Text
                </h3>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[hsl(var(--background)/0.6)] border border-[color:var(--glass-border)]">
                  <p className="flex-1 text-[12.5px] font-mono leading-relaxed text-[hsl(var(--foreground)/0.78)] break-all">
                    {host.share_text}
                  </p>
                  <button
                    onClick={handleCopy}
                    type="button"
                    aria-label="Copy share text"
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(var(--foreground)/0.6)] hover:text-primary hover:bg-[hsl(var(--background))] border border-transparent hover:border-[color:var(--glass-border)] transition-all active:scale-90"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              </section>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[hsl(var(--background)/0.9)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[hsl(var(--background)/0.9)] to-transparent" />
        </div>

        <footer className="relative shrink-0 flex flex-wrap justify-end items-center gap-3 px-7 md:px-8 py-4 border-t border-[hsl(var(--foreground)/0.14)] bg-[hsl(var(--background)/0.85)] backdrop-blur-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-[13px] text-[hsl(var(--foreground)/0.65)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background))] border border-transparent hover:border-[color:var(--glass-border)] transition-all"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(host)}
            className="px-5 py-2.5 bg-primary text-[hsl(var(--primary-foreground))] rounded-xl font-bold text-[13px] shadow-[0_10px_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_14px_28px_hsl(var(--primary)/0.45)] hover:-translate-y-0.5 transition-all active:scale-95 inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Pencil size={15} />
            <span>Edit Host</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HostDetailsModal;
