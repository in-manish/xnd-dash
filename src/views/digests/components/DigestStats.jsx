import React from "react";
import { Activity, BookOpen, Star, TrendingUp } from "lucide-react";
import { formatDecimal, formatNumber } from "../helpers/digestFormatters";

const DigestStats = ({ stats, totalCount }) => {
  const items = [
    { label: "Available", value: formatNumber(totalCount), icon: BookOpen },
    { label: "Published Loaded", value: formatNumber(stats.published), icon: Activity },
    { label: "Loaded Reads", value: formatNumber(stats.totalReads), icon: TrendingUp },
    { label: "Avg Quality", value: formatDecimal(stats.avgQuality), icon: Star },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="glass group relative overflow-hidden rounded-[2rem] border-glass-border p-5">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform group-hover:scale-125" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground/45">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-black leading-none text-foreground">
                  {item.value}
                </p>
              </div>
              <div className="rounded-2xl border border-glass-border bg-background/70 p-3 text-primary">
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DigestStats;
