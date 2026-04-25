import React from "react";
import { RefreshCw, Sparkles } from "lucide-react";

const DigestHeader = ({ totalCount, loadedCount, refreshing, onRefresh }) => (
  <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-background/55 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
        <Sparkles size={15} />
        Digest Command Center
      </div>
      <div>
        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
          Published Digests
        </h1>
        <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-foreground/58 md:text-lg">
          Review every brief in a focused newsroom view. Select any card to inspect
          content, sources, scores, people, media, metrics, and the raw payload.
        </p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-2xl border border-glass-border bg-background/55 px-4 py-3 text-sm font-bold text-foreground/55">
        {loadedCount} loaded{totalCount ? ` of ${totalCount}` : ""}
      </span>
      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:opacity-95"
      >
        <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  </header>
);

export default DigestHeader;
