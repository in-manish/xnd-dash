import React from "react";

export const DetailSection = ({ title, children }) => (
  <section className="rounded-3xl border border-glass-border bg-background/48 p-5">
    <h3 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-foreground/42">
      {title}
    </h3>
    {children}
  </section>
);

export const DetailRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-foreground/8 py-2.5 last:border-b-0">
    <span className="text-xs font-bold text-foreground/45">{label}</span>
    <span className="max-w-[68%] text-right text-sm font-bold text-foreground/78">
      {value || "-"}
    </span>
  </div>
);
