import React, { useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";
import { DetailSection } from "./DetailSection";

const SharePayload = ({ shareText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = shareText || "No share text available.";

  const handleCopy = async (event) => {
    event?.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <DetailSection title="Share Payload">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex w-full items-start gap-3 rounded-2xl border border-glass-border bg-background/60 p-4 text-left transition-all hover:border-primary/35 hover:bg-primary/5"
      >
        <Share2 size={16} className="mt-0.5 shrink-0 text-primary" />
        <p className="flex-1 whitespace-pre-wrap text-xs font-semibold leading-relaxed text-foreground/65">
          {text}
        </p>
        <span
          role="button"
          tabIndex={0}
          onClick={handleCopy}
          onKeyDown={(event) => event.key === "Enter" && handleCopy(event)}
          className="rounded-xl border border-glass-border bg-background/70 p-2 text-foreground/50 transition-all hover:bg-primary/10 hover:text-primary"
          aria-label="Copy share text"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-[2rem] border-glass-border p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-foreground">Share Digest</h3>
                <p className="mt-1 text-sm font-medium text-foreground/55">
                  Copy the prepared share payload for this digest.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-glass-border bg-background/70 p-2 text-foreground/50 hover:text-primary"
                aria-label="Close share modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-glass-border bg-background/65 p-4 text-sm font-semibold leading-relaxed text-foreground/70">
              {text}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "Copied" : "Copy Share Text"}
            </button>
          </div>
        </div>
      )}
    </DetailSection>
  );
};

export default SharePayload;
