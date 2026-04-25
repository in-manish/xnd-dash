import { useCallback, useEffect, useMemo, useState } from "react";
import { DigestsService } from "../../../api/services";

const PAGE_SIZE = 10;

const getStatusResults = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data?.results)) return data.data.results;
  if (Array.isArray(data?.statuses)) return data.statuses;
  return [];
};

export const useDigests = () => {
  const [digests, setDigests] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statusTotal, setStatusTotal] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusesLoading, setStatusesLoading] = useState(true);
  const [statusesError, setStatusesError] = useState(null);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (nextPage = 1) => {
    const isFirstPage = nextPage === 1;
    setError(null);
    isFirstPage ? setLoading(true) : setLoadingMore(true);

    try {
      const data = await DigestsService.getDigests({
        page: nextPage,
        size: PAGE_SIZE,
        status: selectedStatus,
        search: searchKeyword,
      });
      const results = Array.isArray(data?.results) ? data.results : [];
      setDigests((current) => (isFirstPage ? results : [...current, ...results]));
      setMeta(data || {});
      setPage(nextPage);
    } catch (err) {
      console.error("Error fetching digests:", err);
      setError("Failed to load digests. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchKeyword, selectedStatus]);

  const loadStatuses = useCallback(async () => {
    try {
      setStatusesLoading(true);
      setStatusesError(null);
      const data = await DigestsService.getDigestStatuses();
      setStatuses(getStatusResults(data));
      setStatusTotal(data?.total || data?.count || 0);
    } catch (err) {
      console.error("Error fetching digest statuses:", err);
      setStatusesError("Status filters failed to load.");
    } finally {
      setStatusesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  useEffect(() => {
    loadStatuses();
  }, [loadStatuses]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchInput.trim());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const stats = useMemo(() => {
    const published = digests.filter((digest) => digest.status === "Published").length;
    const totalReads = digests.reduce((sum, digest) => sum + (digest.metrics?.read_count || 0), 0);
    const avgQuality = digests.length
      ? digests.reduce((sum, digest) => sum + (digest.editor_score_quality || 0), 0) / digests.length
      : 0;

    return { published, totalReads, avgQuality };
  }, [digests]);

  return {
    digests,
    statuses,
    statusTotal,
    selectedStatus,
    searchInput,
    stats,
    totalCount: meta.count || 0,
    hasNext: Boolean(meta.has_next),
    loading,
    loadingMore,
    statusesLoading,
    statusesError,
    error,
    refresh: () => loadPage(1),
    refreshStatuses: loadStatuses,
    loadMore: () => loadPage(page + 1),
    setSelectedStatus,
    setSearchInput,
  };
};
