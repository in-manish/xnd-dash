import React from "react";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { formatNumber } from "../helpers/digestFormatters";

const StatusFilterChips = ({
  statuses,
  total,
  selectedStatus,
  loading,
  error,
  onSelectStatus,
  onRetry,
}) => (
  <div className="glass rounded-[2rem] border-glass-border p-4">
    <div className="mb-3 flex items-center justify-between gap-3 px-1">
      <h2 className="text-sm font-black uppercase tracking-[0.16em] text-foreground/45">
        Filter by status
      </h2>
      {loading && <Loader2 className="animate-spin text-primary" size={16} />}
    </div>

    {error && (
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/8 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-red-600">
          <AlertCircle size={14} />
          {error}
        </span>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-xs font-black text-primary hover:underline"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    )}

    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelectStatus("")}
        className={`rounded-2xl border px-4 py-2.5 text-sm font-black transition-all ${
          selectedStatus === ""
            ? "border border-primary/70 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            : "border border-foreground/12 bg-background/55 text-foreground/58 hover:border-primary/35 hover:text-primary"
        }`}
      >
        All
        <span className="ml-2 rounded-full bg-background/30 px-2 py-0.5 text-[11px]">
          {formatNumber(total)}
        </span>
      </button>

      {statuses.map((status) => {
        const value = status.slug || status.status_name || status.status_code;
        const label = status.status_name || status.slug || status.status_code;
        const isActive = selectedStatus === value;

        return (
          <button
            type="button"
            key={status.id || value}
            onClick={() => onSelectStatus(value)}
            className={`rounded-2xl border px-4 py-2.5 text-sm font-black transition-all ${
              isActive
                ? "border border-primary/70 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-foreground/12 bg-background/55 text-foreground/58 hover:border-primary/35 hover:text-primary"
            }`}
          >
            {label}
            <span className="ml-2 rounded-full bg-background/30 px-2 py-0.5 text-[11px]">
              {formatNumber(status.count)}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default StatusFilterChips;
