import React from "react";
import { Search, X } from "lucide-react";

const DigestSearchBar = ({ value, onChange }) => (
  <div className="glass rounded-[2rem] border-glass-border p-4">
    <label
      htmlFor="digest-search-input"
      className="mb-3 block text-sm font-black uppercase tracking-[0.16em] text-foreground/45"
    >
      Search Articles
    </label>
    <div className="flex items-center gap-2 rounded-2xl border border-foreground/12 bg-background/60 px-3">
      <Search size={16} className="text-foreground/45" />
      <input
        id="digest-search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type title, author, keyword..."
        className="h-11 w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-foreground/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-lg p-1 text-foreground/50 transition-colors hover:bg-background/70 hover:text-primary"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  </div>
);

export default DigestSearchBar;
