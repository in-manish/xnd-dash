import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { HostConfigService } from '../../api/services';
import { Loader2, AlertCircle, Download, Cloud, Ban, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import HostConfigList from './components/HostConfigList';
import HostConfigModal from './components/HostConfigModal';
import HostDetailsModal from './components/HostDetailsModal';
import HostListToolbar from './components/HostListToolbar';

const triToBool = (v) => (v === 'yes' ? true : v === 'no' ? false : undefined);

const HostConfig = () => {
  const [hosts, setHosts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [listRefreshing, setListRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const firstListRequest = useRef(true);

  const [searchDraft, setSearchDraft] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [group, setGroup] = useState('');
  const [isTop, setIsTop] = useState('any');
  const [isWhitelist, setIsWhitelist] = useState('any');
  const [featuredMode, setFeaturedMode] = useState('default');
  const [actionStatus, setActionStatus] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [editingHost, setEditingHost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [detailsHost, setDetailsHost] = useState(null);

  const listQueryParams = useMemo(
    () => ({
      search: debouncedSearch.trim() || undefined,
      ordering: ordering.trim() || undefined,
      group: group || undefined,
      is_top: triToBool(isTop),
      is_whitelist: triToBool(isWhitelist),
      is_featured: featuredMode === 'all' ? false : undefined,
      action_status: actionStatus.trim() || undefined,
    }),
    [debouncedSearch, ordering, group, isTop, isWhitelist, featuredMode, actionStatus]
  );

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchDraft), 400);
    return () => clearTimeout(t);
  }, [searchDraft]);

  const loadHosts = useCallback(async () => {
    if (firstListRequest.current) {
      setInitialLoading(true);
    } else {
      setListRefreshing(true);
    }
    try {
      const data = await HostConfigService.getHostConfigs(listQueryParams);
      const nextHosts = Array.isArray(data) ? data : (data?.results || []);
      setHosts(nextHosts);
      setError(null);
    } catch (err) {
      setError('Failed to load host configurations. Please try again later.');
      console.error('Error fetching host configs:', err);
    } finally {
      firstListRequest.current = false;
      setInitialLoading(false);
      setListRefreshing(false);
    }
  }, [listQueryParams]);

  useEffect(() => {
    loadHosts();
  }, [loadHosts]);

  const handleAddHost = () => {
    setDetailsHost(null);
    setEditingHost(null);
    setShowModal(true);
  };

  const handleEdit = (host) => {
    setDetailsHost(null);
    setEditingHost(host);
    setShowModal(true);
  };

  const handleOpenDetails = (host) => {
    setDetailsHost(host);
  };

  const handleSave = async (payload) => {
    try {
      setModalLoading(true);
      if (editingHost) {
        await HostConfigService.updateHostConfig(payload);
      } else {
        await HostConfigService.createHostConfig(payload);
      }
      setShowModal(false);
      loadHosts();
    } catch (err) {
      console.error('Error saving host config:', err);
      alert('Failed to save host configuration.');
    } finally {
      setModalLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 bg-transparent">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-slate-500 font-bold">Loading configurations...</p>
      </div>
    );
  }

  const activeCount = hosts.filter((h) => h.is_whitelist).length;
  const blacklistedCount = hosts.filter((h) => !h.is_whitelist).length;

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 mx-auto animate-fadeIn w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-7 mb-10">
        <div>
          <h1 className="text-[38px] md:text-[42px] leading-tight font-extrabold tracking-tight text-slate-900 mb-2">
            Host Configurations
          </h1>
          <p className="text-slate-500 text-[17px] md:text-[18px] font-medium">
            Manage and monitor global service endpoints and routing rules.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-base shadow-sm hover:bg-slate-50 transition-all">
            <Download size={18} strokeWidth={2.5} />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col min-h-[184px]">
          <div className="flex justify-between items-center w-full mb-[18px]">
            <span className="text-slate-500 font-bold text-base">Active Hosts</span>
            <Cloud size={22} className="text-[#0066FF]" strokeWidth={2.5} />
          </div>
          <div className="text-[48px] md:text-[54px] leading-none font-extrabold text-slate-900 mb-3">
            {activeCount}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 mt-auto">
            <TrendingUp size={16} strokeWidth={3} />
            <span>+3 this month</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col min-h-[184px]">
          <div className="flex justify-between items-center w-full mb-[18px]">
            <span className="text-slate-500 font-bold text-base">Blacklisted</span>
            <Ban size={22} className="text-red-500" strokeWidth={2.5} />
          </div>
          <div className="text-[48px] md:text-[54px] leading-none font-extrabold text-slate-900 mb-3">
            {String(blacklistedCount).padStart(2, '0')}
          </div>
          <div className="text-sm font-bold text-slate-400 mt-auto">
            Monitoring 24/7
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col min-h-[184px]">
          <div className="flex justify-between items-center w-full mb-[18px]">
            <span className="text-slate-500 font-bold text-base">Avg Response Time</span>
            <ExternalLink size={22} className="text-[#0066FF]" strokeWidth={2.5} />
          </div>
          <div className="text-[48px] md:text-[54px] leading-none font-extrabold text-slate-900 mb-3">
            124ms
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 mt-auto">
            <TrendingDown size={16} strokeWidth={3} />
            <span>12% improvement</span>
          </div>
        </div>
      </div>

      {/* List Section Container */}
      <div className="relative glass overflow-hidden rounded-2xl border border-[color:var(--glass-border)] shadow-[0_8px_24px_hsl(var(--primary)/0.08)]">
        {listRefreshing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[hsl(var(--background)/0.65)] backdrop-blur-[2px]">
            <Loader2 className="animate-spin text-[hsl(var(--primary))]" size={28} />
          </div>
        )}
        <div className="border-b border-[hsl(var(--foreground)/0.08)] bg-[hsl(var(--background)/0.65)] px-7 py-5">
          <HostListToolbar
            searchDraft={searchDraft}
            onSearchDraftChange={setSearchDraft}
            ordering={ordering}
            onOrderingChange={setOrdering}
            group={group}
            onGroupChange={setGroup}
            isTop={isTop}
            onIsTopChange={setIsTop}
            isWhitelist={isWhitelist}
            onIsWhitelistChange={setIsWhitelist}
            featuredMode={featuredMode}
            onFeaturedModeChange={setFeaturedMode}
            actionStatus={actionStatus}
            onActionStatusChange={setActionStatus}
            filtersOpen={filtersOpen}
            onToggleFilters={() => setFiltersOpen((o) => !o)}
            onAddHost={handleAddHost}
          />
          <div className="mt-4 text-sm font-bold text-[hsl(var(--foreground)/0.45)]">
            {hosts.length} host{hosts.length === 1 ? '' : 's'} loaded
          </div>
        </div>
        
        {error ? (
          <div className="p-12 text-center bg-[hsl(var(--background)/0.55)]">
            <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">Failed to load hosts</h3>
            <p className="text-[hsl(var(--foreground)/0.6)] text-sm mb-4">{error}</p>
            <button type="button" onClick={loadHosts} className="text-primary font-bold text-sm hover:underline">
              Try again
            </button>
          </div>
        ) : (
          <HostConfigList
            hosts={hosts}
            onEdit={handleEdit}
            onOpen={handleOpenDetails}
          />
        )}
      </div>

      {detailsHost && (
        <HostDetailsModal
          host={detailsHost}
          onClose={() => setDetailsHost(null)}
          onEdit={handleEdit}
        />
      )}

      {showModal && (
        <HostConfigModal
          host={editingHost}
          loading={modalLoading}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HostConfig;
