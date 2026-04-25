import React, { useMemo, useState } from "react";
import DigestDetailPanel from "./components/DigestDetailPanel";
import DigestHeader from "./components/DigestHeader";
import DigestList from "./components/DigestList";
import DigestSearchBar from "./components/DigestSearchBar";
import DigestStats from "./components/DigestStats";
import StatusFilterChips from "./components/StatusFilterChips";
import { useDigests } from "./hooks/useDigests";

const DigestsPage = () => {
  const {
    digests,
    statuses,
    statusTotal,
    selectedStatus,
    searchInput,
    stats,
    totalCount,
    hasNext,
    loading,
    loadingMore,
    statusesLoading,
    statusesError,
    error,
    refresh,
    refreshStatuses,
    loadMore,
    setSelectedStatus,
    setSearchInput,
  } = useDigests();
  const [selectedId, setSelectedId] = useState(null);

  const selectedDigest = useMemo(
    () => digests.find((digest) => digest.id === selectedId) || digests[0] || null,
    [digests, selectedId]
  );

  const handleStatusSelect = (status) => {
    setSelectedId(null);
    setSelectedStatus(status);
  };

  return (
    <div className="mx-auto max-w-[1700px] px-3 py-5 md:px-6 md:py-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_30%),radial-gradient(circle_at_80%_10%,hsl(var(--accent)/0.12),transparent_26%)]" />
      <div className="space-y-6 animate-fadeIn">
        <DigestHeader
          totalCount={totalCount}
          loadedCount={digests.length}
          refreshing={loading}
          onRefresh={refresh}
        />
        <DigestStats stats={stats} totalCount={totalCount} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_520px]">
          <div className="space-y-4">
            <DigestSearchBar value={searchInput} onChange={setSearchInput} />
            <StatusFilterChips
              statuses={statuses}
              total={statusTotal || totalCount}
              selectedStatus={selectedStatus}
              loading={statusesLoading}
              error={statusesError}
              onSelectStatus={handleStatusSelect}
              onRetry={refreshStatuses}
            />
            <DigestList
              digests={digests}
              selectedId={selectedDigest?.id}
              loading={loading}
              loadingMore={loadingMore}
              error={error}
              hasNext={hasNext}
              onSelect={(digest) => setSelectedId(digest.id)}
              onRetry={refresh}
              onLoadMore={loadMore}
            />
          </div>
          <DigestDetailPanel digest={selectedDigest} />
        </div>
      </div>
    </div>
  );
};

export default DigestsPage;
