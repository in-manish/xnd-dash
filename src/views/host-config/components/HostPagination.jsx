import React from 'react';

const HostPagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-[hsl(var(--foreground)/0.08)] bg-[hsl(var(--background)/0.55)]">
      <button
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-[13px] font-bold text-[hsl(var(--foreground)/0.55)] hover:text-primary disabled:opacity-40 disabled:hover:text-[hsl(var(--foreground)/0.55)] transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg text-[13px] font-bold flex items-center justify-center transition-colors ${
              currentPage === p
                ? 'bg-primary text-[hsl(var(--primary-foreground))] shadow-[0_4px_12px_hsl(var(--primary)/0.3)]'
                : 'text-[hsl(var(--foreground)/0.6)] hover:bg-[hsl(var(--background))]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-[13px] font-bold text-[hsl(var(--foreground)/0.55)] hover:text-primary disabled:opacity-40 disabled:hover:text-[hsl(var(--foreground)/0.55)] transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default HostPagination;
