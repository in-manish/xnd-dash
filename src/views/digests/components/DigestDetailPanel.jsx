import React from "react";
import { ExternalLink, FileText } from "lucide-react";
import DigestAudioPlayer from "./DigestAudioPlayer";
import { DetailRow, DetailSection } from "./DetailSection";
import FullPayload from "./FullPayload";
import SharePayload from "./SharePayload";
import {
  DEFAULT_DIGEST_IMAGE,
  formatDecimal,
  formatNumber,
  getPersonName,
  getPrimarySource,
  handleDigestImageError,
} from "../helpers/digestFormatters";

const Metric = ({ label, value }) => (
  <div className="rounded-2xl border border-glass-border bg-background/60 p-4">
    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-foreground/40">{label}</p>
    <p className="mt-1 text-xl font-black text-foreground">{value}</p>
  </div>
);

const DigestDetailPanel = ({ digest }) => {
  if (!digest) {
    return (
      <aside className="glass sticky top-24 flex min-h-[520px] items-center justify-center rounded-[2rem] border-glass-border p-8 text-center">
        <div>
          <FileText className="mx-auto mb-4 text-primary" size={36} />
          <h2 className="text-xl font-black text-foreground">Select a digest</h2>
          <p className="mt-2 text-sm font-medium text-foreground/55">
            Click a card to view content, sources, performance, and full payload details.
          </p>
        </div>
      </aside>
    );
  }

  const source = getPrimarySource(digest);
  const metrics = digest.metrics || {};

  return (
    <aside className="glass sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] border-glass-border p-5 scrollbar-hide">
      <img
        src={digest.cover_pic || DEFAULT_DIGEST_IMAGE}
        alt=""
        onError={handleDigestImageError}
        className="mb-5 h-56 w-full rounded-[1.5rem] object-cover"
      />

      <div className="mb-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-black text-primary-foreground">
            {digest.status || "Unknown"}
          </span>
          <span className="rounded-full border border-glass-border bg-background/60 px-3 py-1 text-[11px] font-bold text-foreground/58">
            {digest.format_human || digest.type?.title || "Digest"}
          </span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-foreground">{digest.title}</h2>
        {digest.subtitle && <p className="mt-2 text-sm font-medium text-foreground/55">{digest.subtitle}</p>}
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Metric label="Reads" value={formatNumber(metrics.read_count)} />
        <Metric label="Avg Read" value={formatDecimal(metrics.avg_read, "%")} />
        <Metric label="Quality" value={digest.editor_score_quality ?? "-"} />
        <Metric label="Relevance" value={digest.editor_score_relevance ?? "-"} />
      </div>

      <div className="space-y-4">
        <DetailSection title="Digest Content">
          <div
            className="text-sm leading-relaxed text-foreground/76 [&_a]:font-bold [&_a]:text-primary [&_li]:font-medium [&_p]:mb-3 [&_p]:font-medium [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: digest.digest || "<p>No digest body available.</p>" }}
          />
        </DetailSection>

        <DetailSection title="Publishing">
          <DetailRow label="ID" value={digest.id} />
          <DetailRow label="Slug" value={digest.slug} />
          <DetailRow label="Short code" value={digest.short_code} />
          <DetailRow label="Published" value={digest.first_published_at_for_share || digest.first_published_at_human} />
          <DetailRow label="Created" value={digest.created_at} />
          <DetailRow label="Modified" value={digest.modified_at} />
        </DetailSection>

        <DetailSection title="People">
          <DetailRow label="Author" value={getPersonName(digest.digest_author)} />
          <DetailRow label="Created by" value={getPersonName(digest.created_by)} />
          <DetailRow label="Modified by" value={getPersonName(digest.modified_by)} />
          <DetailRow label="Published by" value={getPersonName(digest.first_published_by)} />
          <DetailRow label="Assigned to" value={getPersonName(digest.digest_internal?.assigned_to)} />
        </DetailSection>

        <DetailSection title="Source And Media">
          <DetailRow label="Source" value={source?.host || source?.title} />
          <DetailRow label="Section" value={digest.section_name} />
          <DetailRow label="Subsection" value={digest.subsection_name} />
          <DetailRow label="Display" value={digest.display_type} />
          <DetailRow label="Audio" value={digest.digest_audio?.audio_link ? "Available" : "Not available"} />
          <div className="mt-4 flex flex-wrap gap-2">
            {source?.link && (
              <a href={source.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-black text-primary">
                <ExternalLink size={14} /> Open Source
              </a>
            )}
          </div>
          <DigestAudioPlayer audioLink={digest.digest_audio?.audio_link} />
        </DetailSection>

        <SharePayload shareText={digest.share_data?.share_text} />

        <FullPayload digest={digest} />
      </div>
    </aside>
  );
};

export default DigestDetailPanel;
