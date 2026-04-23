import React, { useState, useEffect } from 'react';
import { HostConfigService } from '../../api/services';
import { Loader2, AlertCircle, Filter, Download, Cloud, Ban, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import HostConfigList from './components/HostConfigList';
import HostConfigModal from './components/HostConfigModal';
import HostDetailsModal from './components/HostDetailsModal';

const HostConfig = () => {
  const [hosts, setHosts] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editingHost, setEditingHost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [detailsHost, setDetailsHost] = useState(null);

  useEffect(() => {
    fetchHosts();
    
    const handleOpenModal = () => handleCreate();
    window.addEventListener('openAddHostModal', handleOpenModal);
    return () => window.removeEventListener('openAddHostModal', handleOpenModal);
  }, []);

  const fetchHosts = async () => {
    try {
      setLoading(true);
      const data = await HostConfigService.getHostConfigs();
      const nextHosts = Array.isArray(data) ? data : (data?.results || []);
      setHosts(nextHosts);
      setMetaData(data?.meta_data || null);
      setError(null);
    } catch (err) {
      setError('Failed to load host configurations. Please try again later.');
      console.error('Error fetching host configs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (host) => {
    setDetailsHost(null);
    setEditingHost(host);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingHost(null);
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
      fetchHosts();
    } catch (err) {
      console.error('Error saving host config:', err);
      alert('Failed to save host configuration.');
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 bg-transparent">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-slate-500 font-bold">Loading configurations...</p>
      </div>
    );
  }

  const activeCount = hosts.filter(h => h.is_whitelist).length || 42;
  const blacklistedCount = (hosts.filter(h => !h.is_whitelist).length).toString().padStart(2, '0') || '08';

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
            <Filter size={18} strokeWidth={2.5} />
            <span>Filters</span>
          </button>
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
            {blacklistedCount}
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
      <div className="glass border border-[color:var(--glass-border)] rounded-2xl shadow-[0_8px_24px_hsl(var(--primary)/0.08)] overflow-hidden">
        <div className="px-7 py-5 border-b border-[hsl(var(--foreground)/0.08)] flex items-center justify-between bg-[hsl(var(--background)/0.65)]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[hsl(var(--foreground)/0.45)] uppercase tracking-wider">Sort by:</span>
            <select className="text-base font-bold text-[hsl(var(--foreground))] bg-[hsl(var(--background)/0.75)] border border-[color:var(--glass-border)] rounded-lg px-3.5 py-2 outline-none cursor-pointer">
              <option>Alphabetical</option>
              <option>Status</option>
              <option>Recently Added</option>
            </select>
          </div>
          <div className="text-sm font-bold text-[hsl(var(--foreground)/0.45)]">
            Displaying {Math.min(12, hosts.length)} of {hosts.length > 0 ? hosts.length : 50} configurations
          </div>
        </div>
        
        {error ? (
          <div className="p-12 text-center bg-[hsl(var(--background)/0.55)]">
            <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">Failed to load hosts</h3>
            <p className="text-[hsl(var(--foreground)/0.6)] text-sm mb-4">{error}</p>
            <button onClick={fetchHosts} className="text-primary font-bold text-sm hover:underline">Try again</button>
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
