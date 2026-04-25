import React from "react";
import { Clock, Eye, MessageCircle, Star } from "lucide-react";
import {
  clampText,
  DEFAULT_DIGEST_IMAGE,
  formatNumber,
  getPersonName,
  handleDigestImageError,
} from "../helpers/digestFormatters";

const DigestCard = ({ digest, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(digest)}
    className={`group w-full overflow-hidden rounded-[1.75rem] border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 ${
      selected
        ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10"
        : "border-glass-border bg-background/55 hover:border-primary/30"
    }`}
  >
    <div className="flex gap-4">
      <div className="h-28 w-32 shrink-0 overflow-hidden rounded-2xl border border-glass-border bg-background/70">
        <img
          src={digest.cover_pic || DEFAULT_DIGEST_IMAGE}
          alt=""
          onError={handleDigestImageError}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground">
            {digest.status || "Draft"}
          </span>
          <span className="rounded-full border border-glass-border bg-background/70 px-2.5 py-1 text-[10px] font-bold text-foreground/55">
            {digest.type?.title || digest.design_type || "Digest"}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base font-black leading-snug text-foreground">
          {digest.title || "Untitled digest"}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-foreground/55">
          {clampText(digest.digest || digest.subtitle || "", 150)}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-bold text-foreground/45">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {digest.first_published_at_human || digest.posted_at_human || "Not published"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye size={12} /> {formatNumber(digest.metrics?.read_count)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={12} /> {formatNumber(digest.comments)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star size={12} /> Q{digest.editor_score_quality ?? "-"} / R{digest.editor_score_relevance ?? "-"}
          </span>
        </div>

        <p className="mt-3 text-xs font-bold text-foreground/42">
          By {getPersonName(digest.digest_author || digest.created_by)}
        </p>
      </div>
    </div>
  </button>
);

export default DigestCard;
