import React from 'react';
import { Search } from 'lucide-react';

const selectClass =
  'text-sm font-bold text-[hsl(var(--foreground))] bg-[hsl(var(--background)/0.75)] border border-[color:var(--glass-border)] rounded-lg px-3 py-2 outline-none cursor-pointer min-w-0';

const labelClass = 'text-[11px] font-bold text-[hsl(var(--foreground)/0.45)] uppercase tracking-wider';

/**
 * @param {Object} props
 * @param {string} props.searchDraft
 * @param {(v: string) => void} props.onSearchDraftChange
 * @param {string} props.ordering
 * @param {(v: string) => void} props.onOrderingChange
 * @param {string} props.group
 * @param {(v: string) => void} props.onGroupChange
 * @param {'any' | 'yes' | 'no'} props.isTop
 * @param {(v: 'any' | 'yes' | 'no') => void} props.onIsTopChange
 * @param {'any' | 'yes' | 'no'} props.isWhitelist
 * @param {(v: 'any' | 'yes' | 'no') => void} props.onIsWhitelistChange
 * @param {'default' | 'all'} props.featuredMode
 * @param {(v: 'default' | 'all') => void} props.onFeaturedModeChange
 * @param {string} props.actionStatus
 * @param {(v: string) => void} props.onActionStatusChange
 * @param {boolean} props.filtersOpen
 * @param {() => void} props.onToggleFilters
 * @param {() => void} props.onAddHost
 */
const HostListToolbar = ({
  searchDraft,
  onSearchDraftChange,
  ordering,
  onOrderingChange,
  group,
  onGroupChange,
  isTop,
  onIsTopChange,
  isWhitelist,
  onIsWhitelistChange,
  featuredMode,
  onFeaturedModeChange,
  actionStatus,
  onActionStatusChange,
  filtersOpen,
  onToggleFilters,
  onAddHost,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/0.35)]"
            size={18}
            strokeWidth={2.25}
          />
          <input
            type="search"
            value={searchDraft}
            onChange={(e) => onSearchDraftChange(e.target.value)}
            placeholder="Search brand, host, or domain…"
            className="w-full rounded-lg border border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.85)] py-2.5 pl-10 pr-3 text-sm font-medium text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.35)] outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary)/0.15)]"
            aria-label="Search hosts"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onAddHost}
            className="rounded-lg border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary))] px-4 py-2 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[0_8px_20px_hsl(var(--primary)/0.28)] transition-all hover:-translate-y-0.5 hover:brightness-95"
          >
            Add Host
          </button>
          <span className={labelClass}>Sort</span>
          <select
            className={selectClass}
            value={ordering}
            onChange={(e) => onOrderingChange(e.target.value)}
            aria-label="Sort ordering"
          >
            <option value="">Default (sort_by, id)</option>
            <option value="brand_name">Brand A–Z</option>
            <option value="-modified_at">Recently modified</option>
            <option value="-created_at">Recently created</option>
            <option value="sort_by">Sort key</option>
          </select>
          <button
            type="button"
            onClick={onToggleFilters}
            className={`rounded-lg border px-3 py-2 text-sm font-bold transition-colors ${
              filtersOpen
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
                : 'border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.75)] text-[hsl(var(--foreground))]'
            }`}
          >
            Filters
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="grid gap-3 rounded-xl border border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.55)] p-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Group</span>
            <select className={selectClass} value={group} onChange={(e) => onGroupChange(e.target.value)}>
              <option value="">Any</option>
              <option value="MAGAZINE">Magazine</option>
              <option value="NEWSPAPER">Newspaper</option>
              <option value="TV">TV</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Top host</span>
            <select
              className={selectClass}
              value={isTop}
              onChange={(e) => onIsTopChange(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Whitelist</span>
            <select
              className={selectClass}
              value={isWhitelist}
              onChange={(e) => onIsWhitelistChange(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="yes">Whitelisted</option>
              <option value="no">Not whitelisted</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Featured (dashboard)</span>
            <select
              className={selectClass}
              value={featuredMode}
              onChange={(e) => onFeaturedModeChange(e.target.value)}
            >
              <option value="default">Featured only (default)</option>
              <option value="all">Include non-featured</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
            <span className={labelClass}>Action status</span>
            <input
              type="text"
              value={actionStatus}
              onChange={(e) => onActionStatusChange(e.target.value)}
              placeholder="Optional — app-specific"
              className="rounded-lg border border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.85)] px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostListToolbar;
