import React from "react";
import { Headphones } from "lucide-react";

const DigestAudioPlayer = ({ audioLink }) => {
  if (!audioLink) return null;

  return (
    <div className="mt-4 rounded-2xl border border-glass-border bg-background/60 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-foreground/45">
        <Headphones size={14} className="text-primary" />
        Listen On Screen
      </div>
      <audio controls preload="none" className="w-full">
        <source src={audioLink} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default DigestAudioPlayer;
