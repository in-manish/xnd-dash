import React from "react";

const FullPayload = ({ digest }) => (
  <details className="rounded-3xl border border-glass-border bg-background/48 p-5">
    <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.18em] text-primary">
      Full Payload
    </summary>
    <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-background/75 p-4 text-[11px] font-semibold text-foreground/60">
      {JSON.stringify(digest, null, 2)}
    </pre>
  </details>
);

export default FullPayload;
