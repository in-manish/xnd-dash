import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import DigestCard from "./DigestCard";

const DigestList = ({
  digests,
  selectedId,
  loading,
  loadingMore,
  error,
  hasNext,
  onSelect,
  onRetry,
  onLoadMore,
}) => {
  if (loading) {
    return (
      <div className="glass flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-[2rem] border-glass-border">
        <Loader2 className="animate-spin text-primary" size={34} />
        <p className="font-bold text-foreground/55">Loading digests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-[2rem] border-glass-border p-8 text-center">
        <AlertCircle className="text-red-500" size={38} />
        <div>
          <h3 className="text-xl font-black text-foreground">Unable to load digests</h3>
          <p className="mt-2 text-sm font-medium text-foreground/55">{error}</p>
        </div>
        <button type="button" onClick={onRetry} className="rounded-xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
          Try Again
        </button>
      </div>
    );
  }

  if (!digests.length) {
    return (
      <div className="glass rounded-[2rem] border-glass-border p-10 text-center">
        <h3 className="text-xl font-black text-foreground">No digests found</h3>
        <p className="mt-2 text-sm font-medium text-foreground/55">There are no digests for the current query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {digests.map((digest) => (
        <DigestCard
          key={digest.id}
          digest={digest}
          selected={digest.id === selectedId}
          onSelect={onSelect}
        />
      ))}

      {hasNext && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loadingMore}
          className="glass flex w-full items-center justify-center gap-2 rounded-2xl border-glass-border px-5 py-4 text-sm font-black text-primary transition-all hover:bg-primary/10 disabled:cursor-wait disabled:opacity-70"
        >
          {loadingMore && <Loader2 className="animate-spin" size={16} />}
          Load More Digests
        </button>
      )}
    </div>
  );
};

export default DigestList;
